package com.gm.goal_m.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gm.goal_m.model.Goal;
import com.gm.goal_m.model.Task;

@Repository
public interface TaskRepository extends JpaRepository <Task, Long> {

    List<Goal> findByGoal(Goal goal);
 
}
