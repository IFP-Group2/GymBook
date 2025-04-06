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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    public void testCreateEntrenadorFailure() {
        Entrenador entrenador = new Entrenador();
        entrenador.setUsuario(new Usuario()); // Usuario sin ID

        ResponseEntity<Entrenador> response = entrenadorController.createEntrenador(entrenador);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(null, response.getBody());
    }
}