package GymBook.backend.serviciosTesting;

import GymBook.backend.entities.Entrenador;
import GymBook.backend.repositories.EntrenadorRepository;
import GymBook.backend.services.EntrenadorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EntrenadorServiceTest {

    @InjectMocks
    private EntrenadorService entrenadorService;

    @Mock
    private EntrenadorRepository entrenadorRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Entrenador entrenador = new Entrenador();
        when(entrenadorRepository.findAll()).thenReturn(Collections.singletonList(entrenador));

        List<Entrenador> entrenadores = entrenadorService.findAll();

        assertEquals(1, entrenadores.size());
        assertEquals(entrenador, entrenadores.get(0));
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Entrenador entrenador = new Entrenador();
        when(entrenadorRepository.findById(id)).thenReturn(Optional.of(entrenador));

        Optional<Entrenador> foundEntrenador = entrenadorService.findById(id);

        assertEquals(entrenador, foundEntrenador.get());
    }

    @Test
    public void testSave() {
        Entrenador entrenador = new Entrenador();
        when(entrenadorRepository.save(entrenador)).thenReturn(entrenador);

        Entrenador savedEntrenador = entrenadorService.save(entrenador);

        assertEquals(entrenador, savedEntrenador);
        verify(entrenadorRepository).save(entrenador);
    }

    @Test
    public void testDeleteById() {
        Long id = 1L;

        entrenadorService.deleteById(id);

        verify(entrenadorRepository).deleteById(id);
    }
}