package GymBook.backend.controllers;

import GymBook.backend.dtos.LoginRequest;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.EmailService;
import GymBook.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private final UsuarioService usuarioService;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public AuthController(UsuarioService usuarioService, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

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

        // Devuelve el ID y el correo electrónico del usuario
        response.put("message", "Login exitoso");
        response.put("userId", usuario.getId());
        response.put("email", usuario.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            Usuario usuario = usuarioService.findByEmail(email);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Usuario no encontrado");
            }

            // Generar un token de restablecimiento de contraseña
            String token = UUID.randomUUID().toString();
            usuario.setResetPasswordToken(token);
            usuarioService.save(usuario);

            // Enviar correo electrónico con el enlace de restablecimiento
            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            System.out.println("Enviando correo a: " + usuario.getEmail());
            emailService.sendResetPasswordEmail(usuario.getEmail(), resetLink);

            return ResponseEntity.ok("Correo de restablecimiento enviado");
        } catch (Exception e) {
            e.printStackTrace(); // Imprime el error en la consola
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            Usuario usuario = usuarioService.findByResetPasswordToken(token);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Token inválido o expirado");
            }

            usuario.setPassword(passwordEncoder.encode(newPassword));
            usuario.setResetPasswordToken(null); // Limpiar el token
            usuarioService.save(usuario);

            return ResponseEntity.ok("Contraseña actualizada correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }
}