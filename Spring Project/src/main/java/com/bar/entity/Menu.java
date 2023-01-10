package com.bar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Getter;

@Getter
@Table("MENU")
public class Menu {

	@Id
    private Long id;
    
    private String name;
    
    private String typeName;

    @Transient
    private Integer count;

    private Integer amount;
    
    private String summary;
    
    public void order(Integer count) {
    	this.amount = this.amount - count;
    }
}