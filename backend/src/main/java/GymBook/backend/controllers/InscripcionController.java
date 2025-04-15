package GymBook.backend.controllers;

import GymBook.backend.dtos.ReservaRequest;
import GymBook.backend.entities.Clase;
import GymBook.backend.entities.Inscripcion;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.ClaseService;
import GymBook.backend.services.InscripcionService;
import GymBook.backend.services.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;
    private final UsuarioService usuarioService;
    private final ClaseService claseService;


    public InscripcionController(InscripcionService inscripcionService, UsuarioService usuarioService, ClaseService claseService) {
        this.inscripcionService = inscripcionService;
        this.usuarioService = usuarioService;
        this.claseService = claseService;
    }

    @GetMapping
    public List<Inscripcion> getAllInscripciones() {
        return inscripcionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscripcion> getInscripcionById(@PathVariable Long id) {
        Optional<Inscripcion> inscripcion = inscripcionService.findById(id);
        return inscripcion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<?> createInscripcion(@RequestBody ReservaRequest reservaRequest) {
        try {
            Usuario usuario = usuarioService.findByEmail(reservaRequest.getUserEmail());
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Usuario no encontrado");
            }

            Optional<Clase> claseOptional = claseService.findById(reservaRequest.getClassId());
            if (claseOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Clase no encontrada");
            }

            Clase clase = claseOptional.get();
            if (clase.getInscripciones().size() >= clase.getCupoMaximo()) {
                return ResponseEntity.badRequest().body("Cupo máximo alcanzado");
            }

            Inscripcion inscripcion = new Inscripcion();
            inscripcion.setUsuario(usuario);
            inscripcion.setClase(clase);
            inscripcion.setFechaInscripcion(LocalDate.now());

            Inscripcion savedInscripcion = inscripcionService.save(inscripcion);
            return ResponseEntity.ok(savedInscripcion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al hacer la reserva");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscripcion(@PathVariable Long id) {
        inscripcionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

