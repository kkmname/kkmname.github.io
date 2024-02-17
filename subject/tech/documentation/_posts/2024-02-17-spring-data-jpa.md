---
title: "Spring Data JPA(ver.3.2.3)"
layout: page
---

> https://docs.spring.io/spring-data/jpa/reference/index.html
> version: 3.2.3

> Oliver Gierke, Thomas Darimont, Christoph Strobl, Mark Paluch, Jay Bryant, Greg Turnquist
> © 2008-2024 VMware, Inc.
> Copies of this document may be made for your own use and for distribution to others, provided that you do not charge any fee for such copies and further provided that each copy contains this Copyright Notice, whether distributed in print or electronically.

<br/>

---

**index**

[【0】개요](#0개요)  
&nbsp;&nbsp;[【0.1】Spring data 업그레이드](#01Spring-data-업그레이드)  
[【1】JPA](#1JPA)  
&nbsp;&nbsp;[【1.1】시작하기](#11시작하기)  
&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.1】예제 저장소](#111예제-저장소)  
&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2】Hello World](#112Hello-World)  
&nbsp;&nbsp;[【1.2】핵심 개념](#12핵심-개념)  

---

<br/>

# 【0】개요
¶ Overview

*Spring Data JPA provides repository support for the Jakarta Persistence API (JPA). It eases development of applications with a consistent programming model that need to access JPA data sources.*

Spring Data JPA는 Jakarta Persistence API(JPA)에 대한 저장소 지원을 제공한다. JPA 데이터 소스에 액세스해야 하는 일관된 프로그래밍 모델을 사용하여 애플리케이션 개발을 쉽게 한다.

## 【0.1】Spring data 업그레이드
¶ Upgrading Spring Data

*Instructions for how to upgrade from earlier versions of Spring Data are provided on the project [wiki](https://github.com/spring-projects/spring-data-commons/wiki). Follow the links in the [release notes section](https://github.com/spring-projects/spring-data-commons/wiki#release-notes) to find the version that you want to upgrade to.*

이전 버전의 Spring Data에서 업그레이드하는 방법에 대한 지침은 프로젝트 [위키](https://github.com/spring-projects/spring-data-commons/wiki)에서 제공된다. [릴리스 정보 섹션](https://github.com/spring-projects/spring-data-commons/wiki#release-notes)의 링크를 따라 업그레이드하려는 버전을 찾아라.

*Upgrading instructions are always the first item in the release notes. If you are more than one release behind, please make sure that you also review the release notes of the versions that you jumped.*

업그레이드 지침은 항상 릴리스 노트의 첫 번째 항목이다. 두 개 이상의 릴리스가 뒤처져 있는 경우 점프한 버전의 릴리스 노트도 검토하기 바란다.

# 【1】JPA
¶ JPA

*This chapter points out the specialties for repository support for JPA. This builds on the core repository support explained in [Working with Spring Data Repositories](https://docs.spring.io/spring-data/jpa/reference/repositories.html). Make sure you have a sound understanding of the basic concepts explained there.*

이 장에서는 JPA에 대한 저장소 지원의 특수성을 지적한다. 이는 [Spring 데이터 저장소 작업](https://docs.spring.io/spring-data/jpa/reference/repositories.html)에 설명된 핵심 저장소 지원을 기반으로 한다.

## 【1.1】시작하기
¶ Getting Started

*An easy way to bootstrap setting up a working environment is to create a Spring-based project via start.spring.io or create a Spring project in Spring Tools.*

작업 환경을 부트스트랩 설정하는 쉬운 방법은 [start.spring.io](https://start.spring.io/#!type=maven-project&dependencies=h2,data-jpa)를 통해 Spring 기반 프로젝트를 생성하거나 [Spring Tools](https://spring.io/tools)에서 Spring 프로젝트를 생성하는 것이다.

### 【1.1.1】예제 저장소
¶ Examples Repository

*The GitHub [spring-data-examples repository](https://github.com/spring-projects/spring-data-examples) hosts several examples that you can download and play around with to get a feel for how the library works.*

GitHub [spring-data-examples 리포지토리](https://github.com/spring-projects/spring-data-examples)에는 라이브러리 작동 방식을 파악하기 위해 다운로드하고 사용해 볼 수 있는 몇 가지 예제가 있다.

### 【1.1.2】Hello World
¶ Hello World

*Let’s start with a simple entity and its corresponding repository:*

간단한 엔터티와 해당 저장소부터 시작해 본다.

```java
@Entity
class Person {

  @Id @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;

  // getters and setters omitted for brevity
}

interface PersonRepository extends Repository<Person, Long> {

  Person save(Person person);

  Optional<Person> findById(long id);
}
```

*Create the main application to run, as the following example shows:*

다음 예제와 같이 실행할 기본 애플리케이션을 만든다.

```java
@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @Bean
  CommandLineRunner runner(PersonRepository repository) {
    return args -> {

      Person person = new Person();
      person.setName("John");

      repository.save(person);
      Person saved = repository.findById(person.getId()).orElseThrow(NoSuchElementException::new);
    };
  }
}
```

*Even in this simple example, there are a few notable things to point out:*

이 간단한 예에서도 지적해야 할 몇 가지 주목할만한 사항이 있다.

- *Repository instances are automatically implemented. When used as parameters of `@Bean` methods, these will be autowired without further need for annotations.*
- *The basic repository extends `Repository`. We suggest to consider how much API surface you want to expose towards your application. More complex repository interfaces are `ListCrudRepository` or `JpaRepository`.*

- 리포지토리 인스턴스가 자동으로 구현된다. `@Bean` 메소드의 매개변수로 사용되면 추가 주석이 필요 없이 자동으로 연결된다.
- 기본 저장소는 `Repository`를 확장한다. 애플리케이션에 노출하려는 API 표면의 양을 고려하는 것이 좋다. 더 복잡한 저장소 인터페이스는 `ListCrudRepository` 또는 `JpaRepository`입니다.

## 【1.2】핵심 개념
¶ Core concepts

*The central interface in the Spring Data repository abstraction is `Repository`. It takes the domain class to manage as well as the identifier type of the domain class as type arguments. This interface acts primarily as a marker interface to capture the types to work with and to help you to discover interfaces that extend this one. The `CrudRepository` and `ListCrudRepository` interfaces provide sophisticated CRUD functionality for the entity class that is being managed.*

Spring Data 저장소 추상화의 중앙 인터페이스는 `Repository`이다. 관리할 도메인 클래스와 도메인 클래스의 식별자 유형을 유형 인수로 사용한다. 이 인터페이스는 주로 작업할 유형을 캡처하고 이 인터페이스를 확장하는 인터페이스를 검색하는 데 도움이 되는 마커 인터페이스 역할을 한다. `CrudRepository` 및 `ListCrudRepository` 인터페이스는 관리되는 엔터티 클래스에 대한 정교한 CRUD 기능을 제공한다.

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {

  <S extends T> S save(S entity);       // ①
  Optional<T> findById(ID primaryKey);  // ②
  Iterable<T> findAll();                // ③
  long count();                         // ④
  void delete(T entity);                // ⑤
  boolean existsById(ID primaryKey);    // ⑥

  // … more functionality omitted.
}
```

*① Saves the given entity.*  
*② Returns the entity identified by the given ID.*  
*③ Returns all entities.*  
*④ Returns the number of entities.*  
*⑤ Deletes the given entity.*  
*⑥ Indicates whether an entity with the given ID exists.*


① 지정된 엔터티를 저장한다.  
② 지정된 ID로 식별되는 엔터티를 반환한다.  
③ 모든 엔터티를 반환한다.  
④ 엔터티 수를 반환한다.  
⑤ 지정된 엔터티를 삭제한다.  
⑥ 지정된 ID를 가진 엔터티가 존재하는지 여부를 나타낸다.

*The methods declared in this interface are commonly referred to as CRUD methods. `ListCrudRepository` offers equivalent methods, but they return `List` where the `CrudRepository` methods return an `Iterable`.*

이 인터페이스에 선언된 메서드를 일반적으로 CRUD 메서드라고 한다. 동등한 메소드를 제공하지만 `CrudRepository` 메소드가 `Iterable`을 반환하는 반면 `ListCrudRepository`는 `List`를 반환한다.
