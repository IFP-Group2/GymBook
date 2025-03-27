package GymBook.backend.controllers;

import GymBook.backend.entities.Rol;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.RolService;
import GymBook.backend.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final RolService rolService;

    public UsuarioController(UsuarioService usuarioService, RolService rolService) {
        this.usuarioService = usuarioService;
        this.rolService = rolService;
    }

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody Usuario usuario) {
        if (usuario.getRol() == null || usuario.getRol().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<Rol> rolOptional = rolService.findById(usuario.getRol().getId());
        if (rolOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        usuario.setRol(rolOptional.get()); // Asigna el rol existente
        return ResponseEntity.ok(usuarioService.save(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}