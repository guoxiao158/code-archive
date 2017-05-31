package com.zproo;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zproo on 2017/4/19.
 */
// 相当于DAO
// 参数： 表名、主键类型
public interface GirlRepository extends JpaRepository<Girl, Integer> {
}
