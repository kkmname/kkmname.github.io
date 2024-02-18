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
&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2】Hello World](#112hello-world)  
&nbsp;&nbsp;[【1.2】핵심 개념](#12핵심-개념)  
&nbsp;&nbsp;[【1.3】Repository 인터페이스 정의](#13repository-인터페이스-정의)  
&nbsp;&nbsp;&nbsp;&nbsp;[【1.3.1】Fine-tuning Repository 정의](#131fine-tuning-repository-정의)  
&nbsp;&nbsp;&nbsp;&nbsp;[【1.3.3】여러 Spring 데이터 모듈과 함께 리포지토리 사용](#133여러-spring-데이터-모듈과-함께-리포지토리-사용)  

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
- 기본 저장소는 `Repository`를 확장한다. 애플리케이션에 노출하려는 API 표면의 양을 고려하는 것이 좋다. 더 복잡한 저장소 인터페이스는 `ListCrudRepository` 또는 `JpaRepository`이다.

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

> **Note**
>
> *We also provide persistence technology-specific abstractions, such as `JpaRepository` or `MongoRepository`. Those interfaces extend `CrudRepository` and expose the capabilities of the underlying persistence technology in addition to the rather generic persistence technology-agnostic interfaces such as `CrudRepository`.*
>
> 또한 `JpaRepository` 또는 `MongoRepository`와 같은 지속성 기술별 추상화도 제공한다. 이러한 인터페이스는 `CrudRepository`를 확장하고 `CrudRepository`와 같은 다소 일반적인 지속성 기술에 구애받지 않는 인터페이스 외에도 기본 지속성 기술의 기능을 노출한다.

*Additional to the `CrudRepository`, there are `PagingAndSortingRepository` and `ListPagingAndSortingRepository` which add additional methods to ease paginated access to entities:*

`CrudRepository` 외에도 엔터티에 대한 페이지 매김 액세스를 쉽게 하기 위해 추가 메서드를 추가하는 `PagingAndSortingRepository` 및 `ListPagingAndSortingRepository가` 있다.

```java
public interface PagingAndSortingRepository<T, ID>  {
  Iterable<T> findAll(Sort sort);
  Page<T> findAll(Pageable pageable);
}
```

> **Note**
>
> *Extension interfaces are subject to be supported by the actual store module. While this documentation explains the general scheme, make sure that your store module supports the interfaces that you want to use.* 
>
> 확장 인터페이스는 실제 저장소 모듈에서 지원될 수 있다. 이 문서에서는 일반적인 구성표를 설명하지만 저장소 모듈이 사용하려는 인터페이스를 지원하는지 확인하라.

*To access the second page of `User` by a page size of 20, you could do something like the following:*

페이지 크기 20으로 `User`의 두 번째 페이지에 액세스하려면 다음과 같이 할 수 있다.

```java
PagingAndSortingRepository<User, Long> repository = // … get access to a bean
Page<User> users = repository.findAll(PageRequest.of(1, 20));
```

*`ListPagingAndSortingRepository` offers equivalent methods, but returns a `List` where the `PagingAndSortingRepository` methods return an `Iterable`.*

`PagingAndSortingRepository` 메서드가 `Iterable을` 반환하는 반면 `ListPagingAndSortingRepository`는 동등한 메서드를 제공하지만 List를 반환한다.

*In addition to query methods, query derivation for both count and delete queries is available. The following list shows the interface definition for a derived count query:*

쿼리 방식 외에도 개수 쿼리와 삭제 쿼리 모두에 대한 쿼리 파생이 가능하다. 다음 목록은 파생된 카운트 쿼리에 대한 인터페이스 정의를 보여준다.

```java
interface UserRepository extends CrudRepository<User, Long> {
  long countByLastname(String lastname);
}
```

*The following listing shows the interface definition for a derived delete query:*

다음 목록은 파생된 삭제 쿼리에 대한 인터페이스 정의를 보여준다.

```java
interface UserRepository extends CrudRepository<User, Long> {
  long deleteByLastname(String lastname);
  List<User> removeByLastname(String lastname);
}
```

## 【1.3】Repository 인터페이스 정의
¶ Defining Repository Interfaces

*To define a repository interface, you first need to define a domain class-specific repository interface. The interface must extend `Repository` and be typed to the domain class and an ID type. If you want to expose CRUD methods for that domain type, you may extend `CrudRepository`, or one of its variants instead of `Repository`.*

저장소 인터페이스를 정의하려면 먼저 도메인 클래스별 저장소 인터페이스를 정의해야 한다. 인터페이스는 `Repository`를 확장해야 하며 도메인 클래스 및 ID 유형으로 입력되어야 한다. 해당 도메인 유형에 대한 CRUD 메소드를 노출하려면 `Repository` 대신 `CrudRepository` 또는 그 변형 중 하나를 확장할 수 있다.

### 【1.3.1】Fine-tuning Repository 정의
¶ Fine-tuning Repository Definition

*There are a few variants how you can get started with your repository interface.*

저장소 인터페이스를 시작하는 방법에는 몇 가지 변형이 있다.

*The typical approach is to extend `CrudRepository`, which gives you methods for CRUD functionality. CRUD stands for Create, Read, Update, Delete. With version 3.0 we also introduced `ListCrudRepository` which is very similar to the `CrudRepository` but for those methods that return multiple entities it returns a `List` instead of an `Iterable` which you might find easier to use.*

일반적인 접근 방식은 CRUD 기능에 대한 메서드를 제공하는 `CrudRepository`를 확장하는 것이다. CRUD는 생성(Create), 읽기(Read), 업데이트(Update), 삭제(Delete)를 의미한다. 버전 3.0에서는 `CrudRepository`와 매우 유사한 `ListCrudRepository`도 도입했다. 이는 여러 엔터티를 반환하는 메서드의 경우 사용하기 더 쉬운 `Iterable` 대신 `List`를 반환한다.

*If you are using a reactive store you might choose `ReactiveCrudRepository`, or `RxJava3CrudRepository` depending on which reactive framework you are using.*

반응 저장소를 사용하는 경우 사용 중인 반응 프레임워크에 따라 `ReactiveCrudRepository` 또는 `RxJava3CrudRepository`를 선택할 수 있다.

*If you are using Kotlin you might pick `CoroutineCrudRepository` which utilizes Kotlin’s coroutines.*

Kotlin을 사용하는 경우 Kotlin의 코루틴을 활용하는 `CoroutineCrudRepository`를 선택할 수 있다.

*Additional you can extend `PagingAndSortingRepository`, `ReactiveSortingRepository`, `RxJava3SortingRepository`, or `CoroutineSortingRepository` if you need methods that allow to specify a `Sort` abstraction or in the first case a `Pageable` abstraction. Note that the various sorting repositories no longer extended their respective CRUD repository as they did in Spring Data Versions pre 3.0. Therefore, you need to extend both interfaces if you want functionality of both.*

추가로 `Sort` 추상화를 지정하거나 첫 번째 경우 `Pageable` 추상화를 지정할 수 있는 메서드가 필요한 경우 `PagingAndSortingRepository`, `ReactiveSortingRepository`, `RxJava3SortingRepository` 또는 `CoroutineSortingRepository`를 확장할 수 있다. 다양한 정렬 저장소는 3.0 이전의 Spring Data 버전에서처럼 더 이상 해당 CRUD 저장소를 확장하지 않는다. 따라서 두 인터페이스의 기능을 모두 사용하려면 두 인터페이스를 모두 확장해야 한다.

*If you do not want to extend Spring Data interfaces, you can also annotate your repository interface with `@RepositoryDefinition`. Extending one of the CRUD repository interfaces exposes a complete set of methods to manipulate your entities. If you prefer to be selective about the methods being exposed, copy the methods you want to expose from the CRUD repository into your domain repository. When doing so, you may change the return type of methods. Spring Data will honor the return type if possible. For example, for methods returning multiple entities you may choose `Iterable<T>`, `List<T>`, `Collection<T>` or a `VAVR` list.*

Spring Data 인터페이스를 확장하지 않으려면 `@RepositoryDefinition`을 사용하여 저장소 인터페이스에 주석을 달 수도 있다. CRUD 저장소 인터페이스 중 하나를 확장하면 엔터티를 조작하기 위한 전체 메서드 세트가 노출된다. 노출되는 메서드를 선택적으로 선택하려면 CRUD 저장소에서 도메인 저장소로 노출하려는 메서드를 복사하라. 이때 메소드의 반환 유형을 변경할 수 있다. Spring Data는 가능하다면 반환 유형을 존중한다. 예를 들어 여러 엔터티를 반환하는 메서드의 경우 `Iterable<T>`, `List<T>`, `Collection<T>` 또는 `VAVR` 목록을 선택할 수 있다.

*If many repositories in your application should have the same set of methods you can define your own base interface to inherit from. Such an interface must be annotated with `@NoRepositoryBean`. This prevents Spring Data to try to create an instance of it directly and failing because it can’t determine the entity for that repository, since it still contains a generic type variable.*

애플리케이션의 많은 저장소에 동일한 메소드 세트가 있어야 하는 경우 상속할 자체 기본 인터페이스를 정의할 수 있다. 이러한 인터페이스에는 `@NoRepositoryBean`으로 주석을 달아야 한다. 이렇게 하면 Spring Data가 인스턴스를 직접 생성하려고 시도하고 해당 저장소에 대한 엔터티를 결정할 수 없기 때문에 실패하는 것을 방지할 수 있다. 왜냐하면 여전히 일반 유형 변수가 포함되어 있기 때문이다.

*The following example shows how to selectively expose CRUD methods (`findById` and `save`, in this case):*

다음 예에서는 CRUD 메서드(이 경우 `findById` 및 `save`)를 선택적으로 노출하는 방법을 보여준다.

```java
@NoRepositoryBean
interface MyBaseRepository<T, ID> extends Repository<T, ID> {
  Optional<T> findById(ID id);
  <S extends T> S save(S entity);
}

interface UserRepository extends MyBaseRepository<User, Long> {
  User findByEmailAddress(EmailAddress emailAddress);
}
```

*In the prior example, you defined a common base interface for all your domain repositories and exposed `findById(…)` as well as `save(…)`.These methods are routed into the base repository implementation of the store of your choice provided by Spring Data (for example, if you use JPA, the implementation is `SimpleJpaRepository`), because they match the method signatures in `CrudRepository`. So the `UserRepository` can now save users, find individual users by ID, and trigger a query to find `Users` by email address.*

이전 예에서는 모든 도메인 저장소에 대한 공통 기본 인터페이스를 정의하고 `findById(...)` 및 `save(...)`를 노출했다. 이러한 메소드는 Spring Data에서 제공하는 선택한 저장소의 기본 저장소 구현으로 라우팅된다( 예를 들어 JPA를 사용하는 경우 구현은 `SimpleJpaRepository`이다. 이는 `CrudRepository`의 메서드 서명과 일치하기 때문이다. 따라서 `UserRepository`는 이제 사용자를 저장하고, ID로 개별 사용자를 찾고, 이메일 주소로 `Users`를 찾는 쿼리를 실행할 수 있다.

> **Note**
>
>  *The intermediate repository interface is annotated with `@NoRepositoryBean`. Make sure you add that annotation to all repository interfaces for which Spring Data should not create instances at runtime.*
>
> 중간 저장소 인터페이스에는 `@NoRepositoryBean`이라는 주석이 붙는다. Spring Data가 런타임에 인스턴스를 생성하지 말아야 하는 모든 저장소 인터페이스에 해당 주석을 추가했는지 확인하라.

### 【1.3.3】여러 Spring 데이터 모듈과 함께 리포지토리 사용
¶ Using Repositories with Multiple Spring Data Modules

*Using a unique Spring Data module in your application makes things simple, because all repository interfaces in the defined scope are bound to the Spring Data module. Sometimes, applications require using more than one Spring Data module. In such cases, a repository definition must distinguish between persistence technologies. When it detects multiple repository factories on the class path, Spring Data enters strict repository configuration mode. Strict configuration uses details on the repository or the domain class to decide about Spring Data module binding for a repository definition:*

애플리케이션에서 고유한 Spring Data 모듈을 사용하면 정의된 범위의 모든 저장소 인터페이스가 Spring Data 모듈에 바인딩되므로 작업이 간단해진다. 때때로 애플리케이션에서는 둘 이상의 Spring Data 모듈을 사용해야 한다. 이러한 경우 저장소 정의는 지속성 기술을 구별해야 한다. 클래스 경로에서 여러 저장소 팩토리를 감지하면 Spring Data는 엄격한 저장소 구성 모드로 들어간다. 엄격한 구성은 저장소 또는 도메인 클래스에 대한 세부 정보를 사용하여 저장소 정의에 대한 Spring Data 모듈 바인딩을 결정한다.

*⑴ If the repository definition [extends the module-specific repository](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.types), it is a valid candidate for the particular Spring Data module.*
*⑵ If the domain class is [annotated with the module-specific type annotation](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.annotations), it is a valid candidate for the particular Spring Data module. Spring Data modules accept either third-party annotations (such as JPA’s `@Entity`) or provide their own annotations (such as `@Document` for Spring Data MongoDB and Spring Data Elasticsearch).*

⑴ 저장소 정의가 [모듈별 저장소를 확장하는 경우](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.types) 이는 특정 Spring Data 모듈에 대한 유효한 후보이다.
⑵ 도메인 클래스에 [모듈별 유형 주석이 달린 경우](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.annotations) 이는 특정 Spring Data 모듈에 대한 유효한 후보이다. Spring Data 모듈은 제3자 주석(예: JPA의 `@Entity`)을 허용하거나 자체 주석(예: Spring Data MongoDB 및 Spring Data Elasticsearch의 `@Document`)을 제공한다.

*The following example shows a repository that uses module-specific interfaces (JPA in this case):*

다음 예에서는 모듈별 인터페이스(이 경우 JPA)를 사용하는 저장소를 보여준다.

```java
interface MyRepository extends JpaRepository<User, Long> { }

@NoRepositoryBean
interface MyBaseRepository<T, ID> extends JpaRepository<T, ID> { … }

interface UserRepository extends MyBaseRepository<User, Long> { … }
```

*`MyRepository` and `UserRepository` extend `JpaRepository` in their type hierarchy. They are valid candidates for the Spring Data JPA module.*

`MyRepository` 및 `UserRepository`는 유형 계층 구조에서 `JpaRepository`를 확장한다. 이는 Spring Data JPA 모듈의 유효한 후보이다.

*The following example shows a repository that uses generic interfaces:*

다음 예에서는 일반 인터페이스를 사용하는 저장소를 보여준다.

```java
interface AmbiguousRepository extends Repository<User, Long> { … }

@NoRepositoryBean
interface MyBaseRepository<T, ID> extends CrudRepository<T, ID> { … }

interface AmbiguousUserRepository extends MyBaseRepository<User, Long> { … }
```

*`AmbiguousRepository` and `AmbiguousUserRepository` extend only `Repository` and `CrudRepository` in their type hierarchy. While this is fine when using a unique Spring Data module, multiple modules cannot distinguish to which particular Spring Data these repositories should be bound.*

`AmbiguousRepository` 및 `AmbiguousUserRepository`는 유형 계층 구조에서 `Repository` 및 `CrudRepository`만 확장한다. 고유한 Spring Data 모듈을 사용할 때는 괜찮지만 여러 모듈이 이러한 저장소를 바인딩해야 하는 특정 Spring Data를 구별할 수 없다.

*The following example shows a repository that uses domain classes with annotations:*

다음 예에서는 주석이 포함된 도메인 클래스를 사용하는 저장소를 보여준다.

```java
interface PersonRepository extends Repository<Person, Long> { … }

@Entity
class Person { … }

interface UserRepository extends Repository<User, Long> { … }

@Document
class User { … }
```

*`PersonRepository` references `Person`, which is annotated with the JPA `@Entity` annotation, so this repository clearly belongs to Spring Data JPA. `UserRepository` references `User`, which is annotated with Spring Data MongoDB’s `@Document` annotation.*

`PersonRepository`는 JPA `@Entity` 주석이 달린 `Person`을 참조하므로 이 저장소는 분명히 Spring Data JPA에 속한다. `UserRepository`는 Spring Data MongoDB의 `@Document` 주석이 달린 `User`를 참조한다.

*The following bad example shows a repository that uses domain classes with mixed annotations:*

다음 나쁜 예는 주석이 혼합된 도메인 클래스를 사용하는 저장소를 보여준다.

```java
interface JpaPersonRepository extends Repository<Person, Long> { … }

interface MongoDBPersonRepository extends Repository<Person, Long> { … }

@Entity
@Document
class Person { … }
```

*This example shows a domain class using both JPA and Spring Data MongoDB annotations. It defines two repositories, `JpaPersonRepository` and `MongoDBPersonRepository`. One is intended for JPA and the other for MongoDB usage. Spring Data is no longer able to tell the repositories apart, which leads to undefined behavior.*

이 예에서는 JPA 및 Spring Data MongoDB 주석을 모두 사용하는 도메인 클래스를 보여준다. `JpaPersonRepository`와 `MongoDBPersonRepository`라는 두 개의 저장소를 정의한다. 하나는 JPA용이고 다른 하나는 MongoDB용이다. Spring Data는 더 이상 리포지토리를 구분할 수 없으므로 정의되지 않은 동작이 발생한다.

*[Repository type details](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.types) and [distinguishing domain class annotations](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.annotations) are used for strict repository configuration to identify repository candidates for a particular Spring Data module. Using multiple persistence technology-specific annotations on the same domain type is possible and enables reuse of domain types across multiple persistence technologies. However, Spring Data can then no longer determine a unique module with which to bind the repository.*

특정 Spring Data 모듈에 대한 저장소 후보를 식별하기 위한 엄격한 저장소 구성에 [저장소 유형 세부사항](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.types) 및 [구별되는 도메인 클래스 주석](https://docs.spring.io/spring-data/jpa/reference/repositories/definition.html#repositories.multiple-modules.annotations)이 사용된다. 동일한 도메인 유형에 여러 지속성 기술별 주석을 사용하는 것이 가능하며 여러 지속성 기술에서 도메인 유형을 재사용할 수 있다. 그러나 Spring Data는 더 이상 저장소를 바인딩할 고유 모듈을 결정할 수 없다.

*The last way to distinguish repositories is by scoping repository base packages. Base packages define the starting points for scanning for repository interface definitions, which implies having repository definitions located in the appropriate packages. By default, annotation-driven configuration uses the package of the configuration class. The [base package in XML-based configuration](https://docs.spring.io/spring-data/jpa/reference/repositories/create-instances.html#repositories.create-instances.xml) is mandatory.*

저장소를 구별하는 마지막 방법은 저장소 기본 패키지의 범위를 지정하는 것이다. 기본 패키지는 저장소 인터페이스 정의를 검색하기 위한 시작점을 정의한다. 이는 저장소 정의가 적절한 패키지에 있다는 것을 의미한다. 기본적으로 주석 기반 구성은 구성 클래스 패키지를 사용한다. [XML 기반 구성의 기본 패키지](https://docs.spring.io/spring-data/jpa/reference/repositories/create-instances.html#repositories.create-instances.xml)는 필수이다.

*The following example shows annotation-driven configuration of base packages:*

다음 예에서는 기본 패키지의 주석 기반 구성을 보여준다.

```java
@EnableJpaRepositories(basePackages = "com.acme.repositories.jpa")
@EnableMongoRepositories(basePackages = "com.acme.repositories.mongo")
class Configuration { … }
```
