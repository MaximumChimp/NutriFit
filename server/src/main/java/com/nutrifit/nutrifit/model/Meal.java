package com.nutrifit.nutrifit.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mealName;

    @Column(length = 1000)
    private String description;

    private String category;     // e.g., Breakfast, Lunch
    private String dietType;     // e.g., Low Carb, Vegan

    private double price;        // in pesos
    private int calories;

    private String imageUrl;     // saved filename or full URL

    private boolean available;   // toggled from admin

    @ElementCollection
    private List<String> goodFor; // e.g., ["Diabetes", "Heart Health"]

    // ===== Constructors =====
    public Meal() {}

    public Meal(Long id, String mealName, String description, String category,
                String dietType, double price, int calories,
                String imageUrl, boolean available, List<String> goodFor) {
        this.id = id;
        this.mealName = mealName;
        this.description = description;
        this.category = category;
        this.dietType = dietType;
        this.price = price;
        this.calories = calories;
        this.imageUrl = imageUrl;
        this.available = available;
        this.goodFor = goodFor;
    }

    // ===== Getters and Setters =====
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getMealName() { return mealName; }

    public void setMealName(String mealName) { this.mealName = mealName; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getDietType() { return dietType; }

    public void setDietType(String dietType) { this.dietType = dietType; }

    public double getPrice() { return price; }

    public void setPrice(double price) { this.price = price; }

    public int getCalories() { return calories; }

    public void setCalories(int calories) { this.calories = calories; }

    public String getImageUrl() { return imageUrl; }

    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isAvailable() { return available; }

    public void setAvailable(boolean available) { this.available = available; }

    public List<String> getGoodFor() { return goodFor; }

    public void setGoodFor(List<String> goodFor) { this.goodFor = goodFor; }
}
