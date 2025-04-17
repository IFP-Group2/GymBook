package GymBook.backend.repositories;

import GymBook.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    Usuario findByResetPasswordToken(String token);
}
