package GymBook.backend.services;

import GymBook.backend.entities.Clase;
import GymBook.backend.entities.Inscripcion;
import GymBook.backend.entities.Usuario;
import GymBook.backend.repositories.ClaseRepository;
import GymBook.backend.repositories.InscripcionRepository;
import GymBook.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscripcionService {
    @Autowired
    private InscripcionRepository inscripcionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClaseRepository claseRepository;

    public Inscripcion save(Inscripcion inscripcion) {
        // Cargar el usuario y la clase desde la base de datos
        Usuario usuario = usuarioRepository.findById(inscripcion.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Clase clase = claseRepository.findById(inscripcion.getClase().getId())
                .orElseThrow(() -> new RuntimeException("Clase no encontrada"));

        // Verificar si el usuario ya está inscrito en la clase
        if (inscripcionRepository.existsByUsuarioAndClase(usuario, clase)) {
            throw new RuntimeException("El usuario ya está inscrito en esta clase");
        }

        // Verificar si la clase tiene cupo disponible
        if (clase.getInscripciones().size() >= clase.getCupoMaximo()) {
            throw new RuntimeException("Cupo máximo alcanzado");
        }

        // Establecer las relaciones
        inscripcion.setUsuario(usuario);
        inscripcion.setClase(clase);

        // Guardar la inscripción
        return inscripcionRepository.save(inscripcion);
    }

    public Optional<Inscripcion> findById(Long id) {
        return inscripcionRepository.findById(id);
    }

    public List<Inscripcion> findAll() {
        return inscripcionRepository.findAll();
    }

    public void deleteById(Long id) {
        inscripcionRepository.deleteById(id);
    }

    public boolean existsByUsuarioAndClase(Usuario usuario, Clase clase) {
        return inscripcionRepository.existsByUsuarioAndClase(usuario, clase);
    }
}