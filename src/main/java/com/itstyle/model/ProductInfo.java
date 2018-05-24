package com.itstyle.model;

public class ProductInfo {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_info.ID
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_info.PRODUCT_NAME
     *
     * @mbggenerated
     */
    private String productName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_info.PRICE
     *
     * @mbggenerated
     */
    private String price;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_info.INTRODUCTION
     *
     * @mbggenerated
     */
    private String introduction;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_info.ID
     *
     * @return the value of product_info.ID
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_info.ID
     *
     * @param id the value for product_info.ID
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_info.PRODUCT_NAME
     *
     * @return the value of product_info.PRODUCT_NAME
     *
     * @mbggenerated
     */
    public String getProductName() {
        return productName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_info.PRODUCT_NAME
     *
     * @param productName the value for product_info.PRODUCT_NAME
     *
     * @mbggenerated
     */
    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_info.PRICE
     *
     * @return the value of product_info.PRICE
     *
     * @mbggenerated
     */
    public String getPrice() {
        return price;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_info.PRICE
     *
     * @param price the value for product_info.PRICE
     *
     * @mbggenerated
     */
    public void setPrice(String price) {
        this.price = price == null ? null : price.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_info.INTRODUCTION
     *
     * @return the value of product_info.INTRODUCTION
     *
     * @mbggenerated
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_info.INTRODUCTION
     *
     * @param introduction the value for product_info.INTRODUCTION
     *
     * @mbggenerated
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }
}