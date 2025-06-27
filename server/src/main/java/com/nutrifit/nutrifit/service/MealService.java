package com.nutrifit.nutrifit.service;

import com.nutrifit.nutrifit.model.Meal;
import com.nutrifit.nutrifit.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    private final MealRepository mealRepository;

    @Autowired
    public MealService(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Optional<Meal> getMealById(Long id) {
        return mealRepository.findById(id);
    }

    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public Optional<Meal> updateMeal(Long id, Meal updatedMeal) {
        return mealRepository.findById(id).map(existingMeal -> {
            // Update fields
            existingMeal.setMealName(updatedMeal.getMealName());
            existingMeal.setDescription(updatedMeal.getDescription());
            existingMeal.setCategory(updatedMeal.getCategory());
            existingMeal.setDietType(updatedMeal.getDietType());
            existingMeal.setPrice(updatedMeal.getPrice());
            existingMeal.setCalories(updatedMeal.getCalories());
            existingMeal.setImageUrl(updatedMeal.getImageUrl());
            existingMeal.setAvailable(updatedMeal.isAvailable());
            existingMeal.setGoodFor(updatedMeal.getGoodFor());
            return mealRepository.save(existingMeal);
        });
    }

    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }
}
