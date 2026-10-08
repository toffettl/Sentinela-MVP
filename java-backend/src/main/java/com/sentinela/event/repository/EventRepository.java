package com.sentinela.event.repository;

import com.sentinela.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, Long> {
	List<Event> findAllByIdIn(List<Long> ids);

    Optional<Event> findByExternalId(UUID externalId);
}
