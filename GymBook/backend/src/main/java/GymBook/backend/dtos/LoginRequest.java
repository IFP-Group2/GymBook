package GymBook.backend.dtos;

import GymBook.backend.enums.TipoUsuario;

public class LoginRequest {
    private String email;
    private String password;
    private TipoUsuario tipoUsuario;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password, TipoUsuario tipoUsuario) {
        this.email = email;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
