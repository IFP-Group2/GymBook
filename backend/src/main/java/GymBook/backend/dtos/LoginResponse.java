package GymBook.backend.dtos;

public class LoginResponse {
    private String token;
    private String message;
    public String username; // Nombre del usuario

    // Constructor actualizado para incluir el nombre del usuario
    public LoginResponse(String token, String message, String username) {
        this.token = token;
        this.message = message;
        this.username = username;
    }

    // Getters y setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}