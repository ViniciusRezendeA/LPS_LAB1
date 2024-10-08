package com.lps.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lps.back.models.Discipline;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {

}
