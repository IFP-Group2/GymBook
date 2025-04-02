package GymBook.backend.services;

import GymBook.backend.entities.Clase;
import GymBook.backend.repositories.ClaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClaseService {
    private final ClaseRepository claseRepository;

    public ClaseService(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }

    public List<Clase> findAll() {
        return claseRepository.findAll();
    }

    public Optional<Clase> findById(Long id) {
        return claseRepository.findById(id);
    }

    public Clase save(Clase clase) {
        return claseRepository.save(clase);
    }

    public void deleteById(Long id) {
        claseRepository.deleteById(id);
    }
}
