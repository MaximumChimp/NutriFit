package com.nutrifit.nutrifit.repository;

import com.nutrifit.nutrifit.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    // You can add custom query methods here later, if needed
}
