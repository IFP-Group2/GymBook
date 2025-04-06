package GymBook.backend.controllers;

import GymBook.backend.entities.Usuario;
import GymBook.backend.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody Usuario loginRequest) {
        Map<String, String> response = new HashMap<>();

        // Lógica de autenticación real
        Usuario usuario = usuarioService.findByEmail(loginRequest.getEmail());
        if (usuario != null && usuarioService.checkPassword(loginRequest.getPassword(), usuario.getPassword())) {
            response.put("message", "Login exitoso");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Credenciales inválidas");
            return ResponseEntity.status(401).body(response);
        }
    }
}