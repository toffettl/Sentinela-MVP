package com.sentinela.detection.repository;

import com.sentinela.detection.entity.Detection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;

public interface DetectionRepository extends JpaRepository<Detection, Long> {
    @Query("select coalesce(sum(d.riskPoints), 0) from Detection d where d.ip = :ip and d.riskPointsActive = true")
    int sumRiskPointsByIp(@Param("ip") String ip);

    @Modifying
    @Query("update Detection d set d.riskPointsActive = false where d.ip = :ip and d.riskPointsActive = true")
    void resetRiskPointsByIp(@Param("ip") String ip);
}
