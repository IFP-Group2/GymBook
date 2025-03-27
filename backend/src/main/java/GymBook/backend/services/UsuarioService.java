package GymBook.backend.services;

import GymBook.backend.entities.Usuario;
import GymBook.backend.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> findAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if (usuarios.isEmpty()) {
            throw new RuntimeException("Usuarios no encontrados");
        }
        return usuarios;
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}