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

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UsuarioServiceTest {

    @InjectMocks
    private UsuarioService usuarioService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Usuario usuario = new Usuario();
        when(usuarioRepository.findAll()).thenReturn(Collections.singletonList(usuario));

        List<Usuario> usuarios = usuarioService.findAll();

        assertEquals(1, usuarios.size());
        assertEquals(usuario, usuarios.get(0));
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Usuario usuario = new Usuario();
        when(usuarioRepository.findById(id)).thenReturn(Optional.of(usuario));

        Optional<Usuario> foundUsuario = usuarioService.findById(id);

        assertEquals(usuario, foundUsuario.get());
    }

    @Test
    public void testSaveUsuarioSuccess() {
        Usuario usuario = new Usuario();
        usuario.setPassword("password");

        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(usuarioRepository.save(usuario)).thenReturn(usuario);

        Usuario savedUsuario = usuarioService.save(usuario);

        assertEquals("encodedPassword", savedUsuario.getPassword());
        verify(usuarioRepository).save(usuario);
    }

    @Test
    public void testSaveUsuarioWithEmptyPassword() {
        Usuario usuario = new Usuario();
        usuario.setPassword("");

        assertThrows(IllegalArgumentException.class, () -> usuarioService.save(usuario));
    }

    @Test
    public void testFindByEmail() {
        String email = "test@example.com";
        Usuario usuario = new Usuario();
        when(usuarioRepository.findByEmail(email)).thenReturn(usuario);

        Usuario foundUsuario = usuarioService.findByEmail(email);

        assertEquals(usuario, foundUsuario);
    }

    @Test
    public void testCheckPassword() {
        String rawPassword = "password";
        String encodedPassword = "encodedPassword";

        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true);

        boolean isMatch = usuarioService.checkPassword(rawPassword, encodedPassword);

        assertEquals(true, isMatch);
    }

    @Test
    public void testDeleteById() {
        Long id = 1L;

        usuarioService.deleteById(id);

        verify(usuarioRepository).deleteById(id);
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
void testInvalidEmailFormat() {
    String invalidEmail = "usuario@com";
    String password = "123456";

    Exception exception = assertThrows(IllegalArgumentException.class, () -> {
        usuarioService.login(invalidEmail, password);
    });

    assertEquals("Formato de correo inválido", exception.getMessage());
}

}