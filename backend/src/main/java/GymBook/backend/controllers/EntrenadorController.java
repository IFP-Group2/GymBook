package GymBook.backend.controllers;

import GymBook.backend.entities.Entrenador;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.EntrenadorService;
import GymBook.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return entrenador.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
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

        entrenador.setUsuario(usuarioOptional.get()); // Asigna el usuario existente
        return ResponseEntity.ok(entrenadorService.save(entrenador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntrenador(@PathVariable Long id) {
        entrenadorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}