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
        // Arrange
        Rol rol = new Rol();
        when(rolService.findAll()).thenReturn(Collections.singletonList(rol));

        // Act
        List<Rol> roles = rolController.getAllRoles();

        // Assert
        assertEquals(1, roles.size());
        assertEquals(rol, roles.get(0));
    }

    @Test
    public void testGetRolByIdFound() {
        // Arrange
        Long id = 1L;
        Rol rol = new Rol();
        when(rolService.findById(id)).thenReturn(Optional.of(rol));

        // Act
        ResponseEntity<Rol> response = rolController.getRolById(id);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(rol, response.getBody());
    }

    @Test
    public void testGetRolByIdNotFound() {
        // Arrange
        Long id = 1L;
        when(rolService.findById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<Rol> response = rolController.getRolById(id);

        // Assert
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testCreateRol() {
        // Arrange
        Rol rol = new Rol();
        when(rolService.save(rol)).thenReturn(rol);

        // Act
        ResponseEntity<Rol> response = rolController.createRol(rol);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(rol, response.getBody());
    }

    @Test
    public void testDeleteRol() {
        // Arrange
        Long id = 1L;

        // Act
        ResponseEntity<Void> response = rolController.deleteRol(id);

        // Assert
        assertEquals(204, response.getStatusCodeValue());
        verify(rolService).deleteById(id);
    }
}