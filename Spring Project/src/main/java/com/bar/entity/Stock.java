package com.bar.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Getter;

@Getter
@Table("STOCK")
public class Stock {

	@Id
    private Long id;
	 
    private String name;
    
    private String barcode;
    
    private Integer amount;

	public void updateAmount(Integer amount) {
		this.amount = amount;
	}
}
