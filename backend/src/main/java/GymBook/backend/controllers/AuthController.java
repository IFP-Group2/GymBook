package GymBook.backend.controllers;

import GymBook.backend.dtos.LoginRequest;
import GymBook.backend.dtos.LoginResponse;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.EmailService;
import GymBook.backend.securityConfig.JwtService;
import GymBook.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    private JwtService jwtService;
    @Autowired
    private EmailService emailService;

    String nom_usuario = "";

    public AuthController(UsuarioService usuarioService, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Buscar al usuario por su correo electrónico
            Usuario usuario = usuarioService.findByEmail(loginRequest.getEmail());

            // Verificar si el usuario existe
            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
            }
            // Verificar la contraseña utilizando el codificador
            if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
            }

            // Generar el token JWT para el usuario autenticado
            String token = jwtService.generateToken(usuario);

            // Crear la respuesta incluyendo el token, el mensaje y el nombre del usuario
            nom_usuario = usuario.getNombre();
            LoginResponse response = new LoginResponse(token, "Login exitoso", nom_usuario);

            // Devolver la respuesta con el token y el nombre
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Manejo de excepciones y errores internos
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor: " + e.getMessage());
        }
    }



    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            Usuario usuario = usuarioService.findByEmail(email);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Usuario no encontrado");
            }

            String token = UUID.randomUUID().toString();
            usuario.setResetPasswordToken(token);
            usuarioService.save(usuario);

            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            emailService.sendResetPasswordEmail(usuario.getEmail(), resetLink);

            return ResponseEntity.ok("Correo de restablecimiento enviado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        try {
            String token = body.get("token");
            String newPassword = body.get("newPassword");

            if (token == null || token.isEmpty() || newPassword == null || newPassword.isEmpty()) {
                return ResponseEntity.badRequest().body("Token o nueva contraseña no pueden estar vacíos");
            }

            Usuario usuario = usuarioService.findByResetPasswordToken(token);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Token inválido o expirado");
            }

            usuario.setPassword(passwordEncoder.encode(newPassword));
            usuario.setResetPasswordToken(null);
            usuarioService.save(usuario);

            return ResponseEntity.ok("Contraseña actualizada correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error inesperado");
        }
    }

}