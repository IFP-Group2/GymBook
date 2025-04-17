package GymBook.backend.controllersTesting;


import GymBook.backend.controllers.RolController;
import GymBook.backend.entities.Rol;
import GymBook.backend.services.RolService;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RolControllerTest {

    @InjectMocks
    private RolController rolController;

    @Mock
    private RolService rolService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllRoles() {
        Rol rol = new Rol();
        when(rolService.findAll()).thenReturn(Collections.singletonList(rol));

        List<Rol> roles = rolController.getAllRoles();

        assertEquals(1, roles.size());
        assertEquals(rol, roles.get(0));
    }

    @Test
    public void testGetRolByIdFound() {
        Long id = 1L;
        Rol rol = new Rol();
        when(rolService.findById(id)).thenReturn(Optional.of(rol));

        ResponseEntity<Rol> response = rolController.getRolById(id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(rol, response.getBody());
    }

    @Test
    public void testGetRolByIdNotFound() {
        Long id = 1L;
        when(rolService.findById(id)).thenReturn(Optional.empty());

        ResponseEntity<Rol> response = rolController.getRolById(id);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testCreateRol() {
        Rol rol = new Rol();
        when(rolService.save(rol)).thenReturn(rol);

        ResponseEntity<Rol> response = rolController.createRol(rol);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(rol, response.getBody());
    }

    @Test
    public void testDeleteRol() {
        Long id = 1L;

        ResponseEntity<Void> response = rolController.deleteRol(id);

        assertEquals(204, response.getStatusCodeValue());
        verify(rolService).deleteById(id);
    }
}