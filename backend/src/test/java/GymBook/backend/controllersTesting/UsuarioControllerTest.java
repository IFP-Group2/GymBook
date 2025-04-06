package GymBook.backend.controllersTesting;

import GymBook.backend.controllers.UsuarioController;
import GymBook.backend.entities.Rol;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.RolService;
import GymBook.backend.services.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UsuarioControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private RolService rolService; // Simular el RolService

    @InjectMocks
    private UsuarioController usuarioController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateUsuario() {
        // Crear un rol simulado
        Rol rol = new Rol();
        rol.setId(1L);

        Usuario usuario = new Usuario();
        usuario.setNombre("Test User");
        usuario.setEmail("testuser@example.com");
        usuario.setPassword("password123");
        usuario.setTelefono("123456789");
        usuario.setRol(rol); // Asignar un rol al usuario

        when(rolService.findById(1L)).thenReturn(Optional.of(rol));
        when(usuarioService.save(any(Usuario.class))).thenReturn(usuario);

        ResponseEntity<Usuario> response = usuarioController.createUsuario(usuario);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("Test User", response.getBody().getNombre());
        verify(usuarioService, times(1)).save(usuario);
    }

    @Test
    public void testGetUsuarioById() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        when(usuarioService.findById(1L)).thenReturn(Optional.of(usuario));

        ResponseEntity<Usuario> response = usuarioController.getUsuarioById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(1L, response.getBody().getId());
        verify(usuarioService, times(1)).findById(1L);
    }

    @Test
    public void testGetUsuarioByIdNotFound() {
        when(usuarioService.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Usuario> response = usuarioController.getUsuarioById(1L);

        assertEquals(404, response.getStatusCodeValue());
        verify(usuarioService, times(1)).findById(1L);
    }

    @Test
    public void testGetUsuarioByEmail() {
        Usuario usuario = new Usuario();
        usuario.setEmail("testuser@example.com");
        when(usuarioService.findByEmail("testuser@example.com")).thenReturn(usuario);

        ResponseEntity<Usuario> response = usuarioController.getUsuarioByEmail("testuser@example.com");

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("testuser@example.com", response.getBody().getEmail());
        verify(usuarioService, times(1)).findByEmail("testuser@example.com");
    }

    @Test
    public void testGetUsuarioByEmailNotFound() {
        when(usuarioService.findByEmail("testuser@example.com")).thenReturn(null);

        ResponseEntity<Usuario> response = usuarioController.getUsuarioByEmail("testuser@example.com");

        assertEquals(404, response.getStatusCodeValue());
        verify(usuarioService, times(1)).findByEmail("testuser@example.com");
    }
}