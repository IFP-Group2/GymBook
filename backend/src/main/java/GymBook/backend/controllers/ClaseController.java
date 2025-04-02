package GymBook.backend.controllers;

import GymBook.backend.entities.Clase;
import GymBook.backend.services.ClaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clases")
public class ClaseController {
    private final ClaseService claseService;

    public ClaseController(ClaseService claseService) {
        this.claseService = claseService;
    }

    @GetMapping
    public List<Clase> getAllClases() {
        return claseService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clase> getClaseById(@PathVariable Long id) {
        Optional<Clase> clase = claseService.findById(id);
        return clase.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Clase> createClase(@RequestBody Clase clase) {
        return ResponseEntity.ok(claseService.save(clase));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClase(@PathVariable Long id) {
        claseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

