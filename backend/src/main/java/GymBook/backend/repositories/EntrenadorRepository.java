package GymBook.backend.repositories;

import GymBook.backend.entities.Entrenador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrenadorRepository extends JpaRepository<Entrenador, Long> {}
