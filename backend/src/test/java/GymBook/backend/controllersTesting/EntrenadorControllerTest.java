package GymBook.backend.controllersTesting;

import GymBook.backend.controllers.EntrenadorController;
import GymBook.backend.entities.Entrenador;
import GymBook.backend.entities.Usuario;
import GymBook.backend.services.EntrenadorService;
import GymBook.backend.services.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

public class EntrenadorControllerTest {

    @InjectMocks
    private EntrenadorController entrenadorController;

    @Mock
    private EntrenadorService entrenadorService;

    @Mock
    private UsuarioService usuarioService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllEntrenadores() {
        Entrenador entrenador = new Entrenador();
        when(entrenadorService.findAll()).thenReturn(Collections.singletonList(entrenador));

        List<Entrenador> entrenadores = entrenadorController.getAllEntrenadores();

        assertEquals(1, entrenadores.size());
        assertEquals(entrenador, entrenadores.get(0));
    }

    @Test
    public void testGetEntrenadorByIdFound() {
        Long id = 1L;
        Entrenador entrenador = new Entrenador();
        when(entrenadorService.findById(id)).thenReturn(Optional.of(entrenador));

        ResponseEntity<Entrenador> response = entrenadorController.getEntrenadorById(id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(entrenador, response.getBody());
    }

    @Test
    public void testGetEntrenadorByIdNotFound() {
        Long id = 1L;
        when(entrenadorService.findById(id)).thenReturn(Optional.empty());

        ResponseEntity<Entrenador> response = entrenadorController.getEntrenadorById(id);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testCreateEntrenadorSuccess() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        Entrenador entrenador = new Entrenador();
        entrenador.setUsuario(usuario);

        when(usuarioService.findById(1L)).thenReturn(Optional.of(usuario));
        when(entrenadorService.save(entrenador)).thenReturn(entrenador);

        ResponseEntity<Entrenador> response = entrenadorController.createEntrenador(entrenador);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(entrenador, response.getBody());
    }

    @Test
    public void testCreateEntrenadorBadRequestNoUsuario() {
        Entrenador entrenador = new Entrenador(); // Sin usuario

        ResponseEntity<Entrenador> response = entrenadorController.createEntrenador(entrenador);

        assertEquals(400, response.getStatusCodeValue());
        assertNull(response.getBody());
    }

    @Test
    public void testCreateEntrenadorBadRequestUsuarioNotFound() {

        Usuario usuario = new Usuario();
        usuario.setId(1L);
        Entrenador entrenador = new Entrenador();
        entrenador.setUsuario(usuario);

        when(usuarioService.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Entrenador> response = entrenadorController.createEntrenador(entrenador);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testDeleteEntrenador() {
        Long id = 1L;

        ResponseEntity<Void> response = entrenadorController.deleteEntrenador(id);

        assertEquals(204, response.getStatusCodeValue());
        verify(entrenadorService).deleteById(id);
    }
}