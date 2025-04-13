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

        // Establecer las relaciones
        inscripcion.setUsuario(usuario);
        inscripcion.setClase(clase);

        // Guardar la inscripción
        return inscripcionRepository.save(inscripcion);
    }
}