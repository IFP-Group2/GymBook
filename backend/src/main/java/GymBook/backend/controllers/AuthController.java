package GymBook.backend.controllers;

import GymBook.backend.entities.Usuario;
import GymBook.backend.services.UsuarioService;
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
    public ResponseEntity<Map<String, String>> login(@RequestBody Usuario loginRequest) {
        Map<String, String> response = new HashMap<>();

        // Aquí deberías implementar la lógica de autenticación real
        if (loginRequest.getEmail().equals("test@example.com") && loginRequest.getPassword().equals("password")) {
            response.put("message", "Login exitoso");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Credenciales inválidas");
            return ResponseEntity.status(401).body(response);
        }
    }
}