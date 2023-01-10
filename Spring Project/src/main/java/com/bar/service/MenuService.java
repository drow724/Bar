package com.bar.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bar.entity.Menu;
import com.bar.repository.MenuRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;

	public Flux<Menu> getMenus() {
		return menuRepository.findAll().filter(m -> m.getAmount() > 0);
	}

	public void order(List<Menu> request) {
		request.parallelStream().forEach(r -> {
			menuRepository.findById(r.getId()).flatMap(m -> {
				m.order(r.getCount());
				menuRepository.save(m).subscribe();
				return Mono.just(m);
			}).subscribe();
		});
	}
}
