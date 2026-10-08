package com.sentinela.seed.controller;

import com.sentinela.asset.dto.AssetRequest;
import com.sentinela.asset.service.AssetService;
import com.sentinela.user.dto.UserRequest;
import com.sentinela.user.entity.UserRole;
import com.sentinela.user.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/seed")
public class SeedController {

    private final UserService userService;
    private final AssetService assetService;

    public SeedController(UserService userService, AssetService assetService) {
        this.userService = userService;
        this.assetService = assetService;
    }

    @PostMapping
    public Map<String, Object> seed() {
        UserRequest admin = new UserRequest();
        admin.setName("Administrador");
        admin.setEmail("admin@sentinela.com");
        admin.setPassword("admin123");
        admin.setRole(UserRole.ADMIN);
        userService.create(admin);

        UserRequest analyst = new UserRequest();
        analyst.setName("Analista João");
        analyst.setEmail("joao@sentinela.com");
        analyst.setPassword("analista123");
        analyst.setRole(UserRole.ANALYST);
        userService.create(analyst);

        AssetRequest server1 = new AssetRequest();
        server1.setName("Web Server Principal");
        server1.setHostname("web-server-01");
        server1.setIp("192.168.1.10");
        server1.setOperatingSystem("Ubuntu 22.04");
        assetService.create(server1);

        AssetRequest server2 = new AssetRequest();
        server2.setName("Database Produção");
        server2.setHostname("db-prod-01");
        server2.setIp("192.168.1.20");
        server2.setOperatingSystem("CentOS 8");
        assetService.create(server2);

        return Map.of(
                "message", "Dados de seed criados com sucesso",
                "users", 2,
                "assets", 2
        );
    }
}