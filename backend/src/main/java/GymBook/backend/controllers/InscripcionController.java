package GymBook.backend.controllers;

import GymBook.backend.entities.Inscripcion;
import GymBook.backend.services.InscripcionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inscripciones")
public class InscripcionController {
    private final InscripcionService inscripcionService;

    public InscripcionController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
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
    public ResponseEntity<?> createInscripcion(@RequestBody Inscripcion inscripcion) {
        try {
            Inscripcion savedInscripcion = inscripcionService.save(inscripcion);
            return ResponseEntity.ok(savedInscripcion);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Devuelve el mensaje de error
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al hacer la reserva. Intenta de nuevo.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscripcion(@PathVariable Long id) {
        inscripcionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

