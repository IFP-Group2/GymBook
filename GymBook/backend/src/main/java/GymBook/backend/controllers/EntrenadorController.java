package GymBook.backend.controllers;

import GymBook.backend.entities.Entrenador;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.EntrenadorService;
import GymBook.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/entrenadores")
public class EntrenadorController {

    @Autowired
    private final EntrenadorService entrenadorService;

    @Autowired
    private final UsuarioService usuarioService;

    public EntrenadorController(EntrenadorService entrenadorService, UsuarioService usuarioService) {
        this.entrenadorService = entrenadorService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Entrenador> getAllEntrenadores() {
        return entrenadorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrenador> getEntrenadorById(@PathVariable Long id) {
        Optional<Entrenador> entrenador = entrenadorService.findById(id);
        return entrenador.map(e -> {
            // Aquí puedes incluir el nombre del usuario en la respuesta
            return ResponseEntity.ok(e);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Entrenador> createEntrenador(@RequestBody Entrenador entrenador) {
        if (entrenador.getUsuario() == null || entrenador.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<Usuario> usuarioOptional = usuarioService.findById(entrenador.getUsuario().getId());
        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Asigna el usuario existente al entrenador
        entrenador.setUsuario(usuarioOptional.get());

        try {
            // Guarda el entrenador en la base de datos
            Entrenador savedEntrenador = entrenadorService.save(entrenador);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEntrenador);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEntrenador(@PathVariable Long id, @RequestBody Entrenador entrenador) {
        try {
            if (entrenador.getUsuario() == null || entrenador.getUsuario().getId() == null) {
                return ResponseEntity.badRequest().body("{\"message\": \"El ID del usuario es requerido.\"}");
            }

            Optional<Entrenador> existingEntrenador = entrenadorService.findById(id);
            if (!existingEntrenador.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Entrenador no encontrado.\"}");
            }

            // Fetch the Usuario entity from the database
            Optional<Usuario> usuarioOptional = usuarioService.findById(entrenador.getUsuario().getId());
            if (usuarioOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("{\"message\": \"Usuario no encontrado.\"}");
            }

            // Update fields
            Entrenador updatedEntrenador = existingEntrenador.get();
            updatedEntrenador.setEspecialidad(entrenador.getEspecialidad());
            updatedEntrenador.setExperiencia(entrenador.getExperiencia());
            updatedEntrenador.setUsuario(usuarioOptional.get()); // Set the managed Usuario entity

            // Save updated trainer
            Entrenador savedEntrenador = entrenadorService.save(updatedEntrenador);
            return ResponseEntity.ok(savedEntrenador);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error al actualizar el entrenador: " + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntrenador(@PathVariable Long id) {
        entrenadorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}