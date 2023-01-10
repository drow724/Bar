package com.bar.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.bar.entity.Menu;

public interface MenuRepository extends R2dbcRepository<Menu, Long> {

}
