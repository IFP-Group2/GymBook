package GymBook.backend.serviciosTesting;

import GymBook.backend.entities.Usuario;
import GymBook.backend.repositories.UsuarioRepository;
import GymBook.backend.services.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder; // Simular BCryptPasswordEncoder

    @InjectMocks
    private UsuarioService usuarioService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Test User");
        usuario.setEmail("testuser@example.com");
        usuario.setPassword("password123");
        usuario.setTelefono("123456789");

        // Simular el comportamiento del passwordEncoder
        when(passwordEncoder.encode(any(CharSequence.class))).thenReturn("encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        Usuario savedUsuario = usuarioService.save(usuario);

        assertNotNull(savedUsuario);
        assertEquals("Test User", savedUsuario.getNombre());
        verify(usuarioRepository, times(1)).save(usuario);
    }

    @Test
    public void testFindByEmail() {
        Usuario usuario = new Usuario();
        usuario.setEmail("testuser@example.com");

        when(usuarioRepository.findByEmail("testuser@example.com")).thenReturn(usuario);

        Usuario foundUsuario = usuarioService.findByEmail("testuser@example.com");

        assertNotNull(foundUsuario);
        assertEquals("testuser@example.com", foundUsuario.getEmail());
        verify(usuarioRepository, times(1)).findByEmail("testuser@example.com");
    }

    @Test
    public void testFindById() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Optional<Usuario> foundUsuario = usuarioService.findById(1L);

        assertTrue(foundUsuario.isPresent());
        assertEquals(1L, foundUsuario.get().getId());
        verify(usuarioRepository, times(1)).findById(1L);
    }
}