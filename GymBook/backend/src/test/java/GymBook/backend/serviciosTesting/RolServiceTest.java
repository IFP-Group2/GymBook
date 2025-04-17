package GymBook.backend.serviciosTesting;

import GymBook.backend.entities.Rol;
import GymBook.backend.repositories.RolRepository;
import GymBook.backend.services.RolService;
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

public class RolServiceTest {

    @InjectMocks
    private RolService rolService;

    @Mock
    private RolRepository rolRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Rol rol = new Rol();
        when(rolRepository.findAll()).thenReturn(Collections.singletonList(rol));

        List<Rol> roles = rolService.findAll();

        assertEquals(1, roles.size());
        assertEquals(rol, roles.get(0));
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Rol rol = new Rol();
        when(rolRepository.findById(id)).thenReturn(Optional.of(rol));

        Optional<Rol> foundRol = rolService.findById(id);

        assertEquals(rol, foundRol.get());
    }

    @Test
    public void testSave() {
        Rol rol = new Rol();
        when(rolRepository.save(rol)).thenReturn(rol);

        Rol savedRol = rolService.save(rol);

        assertEquals(rol, savedRol);
        verify(rolRepository).save(rol);
    }

    @Test
    public void testDeleteById() {
        Long id = 1L;

        rolService.deleteById(id);

        verify(rolRepository).deleteById(id);
    }
}