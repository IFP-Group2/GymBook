package GymBook.backend.entities;

import jakarta.persistence.*;
@Entity
@Table(name = "entrenadores")
public class Entrenador {
    @Id
    private Long usuarioId;
    private String especialidad;
    private int experiencia;

    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getNombre() {
        return usuario != null ? usuario.getNombre() : null; // Método para obtener el nombre del usuario
    }

    public Entrenador() {
    }

    public Entrenador(Long usuarioId, String especialidad, int experiencia, Usuario usuario) {
        this.usuarioId = usuarioId;
        this.especialidad = especialidad;
        this.experiencia = experiencia;
        this.usuario = usuario;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public int getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(int experiencia) {
        this.experiencia = experiencia;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}