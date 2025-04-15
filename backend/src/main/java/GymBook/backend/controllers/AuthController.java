package GymBook.backend.controllers;

import GymBook.backend.dtos.LoginRequest;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private final UsuarioService usuarioService;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UsuarioService usuarioService, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, String> response = new HashMap<>();

        Usuario usuario = usuarioService.findByEmail(loginRequest.getEmail());
        if (usuario == null) {
            response.put("message", "Credenciales inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (!usuarioService.checkPassword(loginRequest.getPassword(), usuario.getPassword())) {
            response.put("message", "Credenciales inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (usuario.getTipoUsuario() != loginRequest.getTipoUsuario()) {
            response.put("message", "Tipo de usuario incorrecto");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("message", "Login exitoso");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String email,
            @RequestParam String newPassword) {
        Usuario usuario = usuarioService.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        usuario.setPassword(passwordEncoder.encode(newPassword));
        usuarioService.save(usuario);
        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }
}