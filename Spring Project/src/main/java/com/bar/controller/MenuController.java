package com.bar.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bar.entity.Menu;
import com.bar.service.MenuService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RequestMapping("/menu")
@RestController
public class MenuController {

	private final MenuService menuService;
	
	@GetMapping
	public Flux<Menu> getMenus() {
		return menuService.getMenus();
	}
	
	@PostMapping
	public void order(@RequestBody List<Menu> request) {
		menuService.order(request);
	}
}
