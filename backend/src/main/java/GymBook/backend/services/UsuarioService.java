package GymBook.backend.services;

import GymBook.backend.entities.Usuario;
import GymBook.backend.exceptions.UserNotFoundException;
import GymBook.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder; // Inicializa passwordEncoder
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        return Optional.ofNullable(usuarioRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + id)));
    }

    public Usuario save(Usuario usuario) {
        if (usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
            throw new IllegalArgumentException("La contraseña no puede estar vacía");
        }

        // Encriptar la contraseña antes de guardar el usuario
        String encodedPassword = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(encodedPassword); // Establecer la contraseña encriptada
        return usuarioRepository.save(usuario); // Guardar el usuario en la base de datos
    }

    public void testPassword(String rawPassword) {
        Usuario usuario = usuarioRepository.findByEmail("juan.perez@example.com");
        if (usuario != null) {
            boolean matches = checkPassword(rawPassword, usuario.getPassword());
            System.out.println("Contraseña coincide: " + matches);
        } else {
            System.out.println("Usuario no encontrado");
        }
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    public Usuario findByResetPasswordToken(String token) {
        return usuarioRepository.findByResetPasswordToken(token);
    }

    public Usuario login(String email, String password) {
        if (!isEmailValid(email)) {
            throw new IllegalArgumentException("Formato de correo inválido");
        }
    
        // Por ahora, no importa si no haces login real. Esto es solo para el test.
        return null;
    }
    
    public boolean isEmailValid(String email) {
        String regex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        return email.matches(regex);
    }
    

}