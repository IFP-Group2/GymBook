package GymBook.backend.repositories;

import GymBook.backend.entities.Clase;
import GymBook.backend.entities.Inscripcion;
import GymBook.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    boolean existsByUsuarioAndClase(Usuario usuario, Clase clase);
}
