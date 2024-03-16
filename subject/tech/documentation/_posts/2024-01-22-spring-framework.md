--
title: "Spring Framework(ver.6.1.3)"
layout: page
---

> https://docs.spring.io/spring-framework/reference  
> version: 6.1.3

Rod Johnson, Juergen Hoeller, Keith Donald, Colin Sampaleanu, Rob Harrop, Thomas Risberg, Alef Arendsen, Darren Davison, Dmitriy Kopylenko, Mark Pollack, Thierry Templier, Erwin Vervaet, Portia Tung, Ben Hale, Adrian Colyer, John Lewis, Costin Leau, Mark Fisher, Sam Brannen, Ramnivas Laddad, Arjen Poutsma, Chris Beams, Tareq Abedrabbo, Andy Clement, Dave Syer, Oliver Gierke, Rossen Stoyanchev, Phillip Webb, Rob Winch, Brian Clozel, Stephane Nicoll, Sebastien Deleuze, Jay Bryant, Mark Paluch

Copyright © 2002 - 2024 VMware, Inc. All Rights Reserved.

Copies of this document may be made for your own use and for distribution to others, provided that you do not charge any fee for such copies and further provided that each copy contains this Copyright Notice, whether distributed in print or electronically.

<br/>

---

**index**

[【0】개요](#0개요)  
&nbsp;&nbsp;[【0.1】Spring Framework 개요](#01spring-framework-개요)  
&nbsp;&nbsp;[【0.2】”Spring”이 의미하는 것](#02spring이-의미하는-것)  
&nbsp;&nbsp;[【0.3】Spring의 역사와 Spring 프레임워크](#03spring의-역사와-spring-프레임워크)  
&nbsp;&nbsp;[【0.4】디자인 철학](#04디자인-철학)  
&nbsp;&nbsp;[【0.5】피드백 및 기여](#05피드백-및-기여)  
&nbsp;&nbsp;[【0.6】시작하기](#06시작하기)  
[【1】핵심기술](#1핵심기술)  
&nbsp;&nbsp;[【1.1】IoC 컨테이너](#11ioc-컨테이너)  
&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.1】Spring IoC 컨테이너 및 Bean 소개](#111spring-ioc-컨테이너-및-bean-소개)  
&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2】컨테이너 개요](#112컨테이너-개요)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2.1】구성 메타데이터](#1121구성-메타데이터)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2.2】컨테이너 인스턴스화](#1122컨테이너-인스턴스화)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2.3】XML 기반 구성 메타데이터 작성](#1123xml-기반-구성-메타데이터-작성)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2.4】Groovy Bean 정의 DSL](#1124groovy-bean-정의-dsl)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[【1.1.2.5】컨테이너 사용](#1125컨테이너-사용)  

---

<br/>

# 【0】개요
¶ Overview

## 【0.1】Spring Framework 개요
¶ Spring Framework Overview

*Spring makes it easy to create Java enterprise applications. It provides everything you need to embrace the Java language in an enterprise environment, with support for Groovy and Kotlin as alternative languages on the JVM, and with the flexibility to create many kinds of architectures depending on an application’s needs. As of Spring Framework 6.0, Spring requires Java 17+.*

Spring을 사용하면 Java 엔터프라이즈 애플리케이션을 쉽게 만들 수 있다. JVM의 대체 언어로 Groovy 및 Kotlin을 지원하고 애플리케이션 요구 사항에 따라 다양한 종류의 아키텍처를 생성할 수 있는 유연성을 통해 엔터프라이즈 환경에서 Java 언어를 수용하는 데 필요한 모든 것을 제공한다. Spring Framework 6.0부터 Spring에는 Java17+가 필요하다.

*Spring supports a wide range of application scenarios. In a large enterprise, applications often exist for a long time and have to run on a JDK and application server whose upgrade cycle is beyond developer control. Others may run as a single jar with the server embedded, possibly in a cloud environment. Yet others may be standalone applications (such as batch or integration workloads) that do not need a server.*

Spring은 광범위한 애플리케이션 시나리오를 지원한다. 대기업에서는 애플리케이션이 오랫동안 존재하고 업그레이드 주기가 개발자의 통제 범위를 벗어나는 JDK 및 애플리케이션 서버에서 실행되어야 하는 경우가 많다. 다른 것들은 클라우드 환경에서 서버가 내장된 단일 jar로 실행될 수 있다. 그러나 다른 것들은 서버가 필요하지 않은 독립 실행형 애플리케이션(예: 배치 또는 통합 워크로드)일 수 있다.

*Spring is open source. It has a large and active community that provides continuous feedback based on a diverse range of real-world use cases. This has helped Spring to successfully evolve over a very long time.*

스프링은 오픈소스다. 다양한 실제 사용 사례를 기반으로 지속적인 피드백을 제공하는 크고 활동적인 커뮤니티가 있다. 이는 Spring이 오랜 시간 동안 성공적으로 발전하는데 도움이 되었다.

## 【0.2】"Spring"이 의미하는 것
¶ What We Mean by "Spring"

*The term "Spring" means different things in different contexts. It can be used to refer to the Spring Framework project itself, which is where it all started. Over time, other Spring projects have been built on top of the Spring Framework. Most often, when people say "Spring", they mean the entire family of projects. This reference documentation focuses on the foundation: the Spring Framework itself.*

"Spring"이라는 용어는 상황에 따라 다른 것을 의미한다. 이는 모든 것이 시작된 Spring Framework 프로젝트 자체를 참조하는 데 사용될 수 있다. 시간이 지남에 따라 다른 Spring 프로젝트가 Spring Framework를 기반으로 구축되었다. 대부분 사람들이 "Spring"이라고 하면 전체 프로젝트 계열을 의미한다. 이 참조 문서는 Spring Framework 자체의 기초에 중점을 둔다.

*The Spring Framework is divided into modules. Applications can choose which modules they need. At the heart are the modules of the core container, including a configuration model and a dependency injection mechanism. Beyond that, the Spring Framework provides foundational support for different application architectures, including messaging, transactional data and persistence, and web. It also includes the Servlet-based Spring MVC web framework and, in parallel, the Spring WebFlux reactive web framework.*

Spring Framework는 모듈로 나누어져 있다. 애플리케이션은 필요한 모듈을 선택할 수 있다. 그 중심에는 구성 모델과 종속성 주입 매커니즘을 포함하는 코어 컨테이너의 모듈이 있다. 그 외에도 Spring Framework는 메시징, 트랜잭션 데이터 및 지속성, 웹을 포함한 다양한 애플리케이션 아키텍처에 대한 기본 지원을 제공한다. 또한 Servlet 기반 Spring MVC 웹 프레임워크와 동시에 Spring WebFlux 반응형 웹 프레임워크도 포함되어 있다.

*A note about modules: Spring’s framework jars allow for deployment to JDK 9’s module path ("Jigsaw"). For use in Jigsaw-enabled applications, the Spring Framework 5 jars come with "Automatic-Module-Name" manifest entries which define stable language-level module names ("spring.core", "spring.context", etc.) independent from jar artifact names (the jars follow the same naming pattern with "-" instead of ".", e.g. "spring-core" and "spring-context"). Of course, Spring’s framework jars keep working fine on the classpath on both JDK 8 and 9+.*

모듈에 대한 참고 사항: Spring의 프레임워크 jar를 사용하면 JDK 9의 모듈 경로("Jigsaw")에 배포할 수 있따. Jigsaw 지원 애플리케이션에서 사용하기 위해 Spring Framework 5 jar에는 다음과 독립적으로 안정적인 언어 수준 모듈 이름("spring.core", "spring.context" 등)을 정의하는 "Automatic-Module-Name" 매니페스트 항목이 함께 제공된다. jar 아티팩트 이름(jar는 "." 대신 "-"를 사용하여 동일한 명명 패턴을 따른다(예: "spring-core" 및 "spring-context")). 물론 Spring의 프레임워크 jar는 JDK8과 9+의 클래스 경로에서 계속 잘 작동한다.

## 【0.3】Spring의 역사와 Spring 프레임워크
¶ History of Spring and the Spring Framework

*Spring came into being in 2003 as a response to the complexity of the early [J2EE](https://en.wikipedia.org/wiki/Java_Platform,_Enterprise_Edition) specifications. While some consider Java EE and its modern-day successor Jakarta EE to be in competition with Spring, they are in fact complementary. The Spring programming model does not embrace the Jakarta EE platform specification; rather, it integrates with carefully selected individual specifications from the traditional EE umbrella:*

Spring은 초기 [J2EE](https://en.wikipedia.org/wiki/Java_Platform,_Enterprise_Edition) 사양의 복잡성에 대한 대응으로 2003년에 등장했다. 일부에서는 Java EE와 최신 후속 버전인 Jakarta EE가 Spring과 경쟁 관계에 있다고 생각하지만 실제로는 상호 보완적이다. Spring 프로그래밍 모델은 Jakarta EE 플랫폼 사양을 수용하지 않는다. 오히려 전통적인 EE(이하 목록)에서 엄선된 개별 사양과 통합된다.

- Servlet API([JSR 340](https://www.jcp.org/en/jsr/detail?id=340))
- WebSocket API([JSR 356](https://www.jcp.org/en/jsr/detail?id=356))
- Concurrency Utilities([JSR 236](https://www.jcp.org/en/jsr/detail?id=236))
- JSON Binding API([JSR 367](https://www.jcp.org/en/jsr/detail?id=367))
- Bean Validation([JSR 303](https://www.jcp.org/en/jsr/detail?id=303))
- JPA([JSR 338](https://www.jcp.org/en/jsr/detail?id=338))
- JMS([JSR 913](https://www.jcp.org/en/jsr/detail?id=914))
- as well as JTA/JCA setups for transaction coordination, if necessary.

*The Spring Framework also supports the Dependency Injection ([JSR 330](https://www.jcp.org/en/jsr/detail?id=330)) and Common Annotations ([JSR 250](https://www.jcp.org/en/jsr/detail?id=250)) specifications, which application developers may choose to use instead of the Spring-specific mechanisms provided by the Spring Framework. Originally, those were based on common `javax` packages.*

Spring Framework는 애플리케이션 개발자가 Spring Framework에서 제공하는 Spring 특정 메커니즘 대신 사용하도록 선택할 수 있는 종속성 주입([JSR 330](https://www.jcp.org/en/jsr/detail?id=330)) 및 공통 주석([JSR 250](https://www.jcp.org/en/jsr/detail?id=250)) 사양도 지원한다. 원래는 일반적인 `javax` 패키지를 기반으로 했다.

*As of Spring Framework 6.0, Spring has been upgraded to the Jakarta EE 9 level (e.g. Servlet 5.0+, JPA 3.0+), based on the `jakarta` namespace instead of the traditional `javax` packages. With EE 9 as the minimum and EE 10 supported already, Spring is prepared to provide out-of-the-box support for the further evolution of the Jakarta EE APIs. Spring Framework 6.0 is fully compatible with Tomcat 10.1, Jetty 11 and Undertow 2.3 as web servers, and also with Hibernate ORM 6.1.*

Spring Framework 6.0부터 Spring은 전통적인 `javax` 패키지 대신 `jakarta` 네임스페이스를 기반으로 Jakarata EE 9레벨(예: Servlet 5.0+, JPA 3.0+)로 업그레이드되었다. 최소 EE9와 이미 지원되는 EE10을 통해 Spring은 Jakrta EE API의 추가 발전을 위한 기본 지원을 제공할 준비가 되어 있다. Spring Framework 6.0은 웹 서버인 Tomcat 10.1, Jetty 11 및 Undertow 2.3 및 Hibernate ORM 6.1과 완벽하게 호환된다.

*Over time, the role of Java/Jakarta EE in application development has evolved. In the early days of J2EE and Spring, applications were created to be deployed to an application server. Today, with the help of Spring Boot, applications are created in a devops- and cloud-friendly way, with the Servlet container embedded and trivial to change. As of Spring Framework 5, a WebFlux application does not even use the Servlet API directly and can run on servers (such as Netty) that are not Servlet containers.*

시간이 지남에 따라 애플리케이션 개발에서 Java/Jakarta EE의 역할이 발전했다. J2EE 및 Spring 초기에는 애플리케이션 서버에 배포하기 위해 애플리케이션이 만들어졌다. 오늘날 Spring Boot의 도움으로 애플리케이션은 DevOps 및 클라우드 친화적인 방식으로 생성되며 서블릿 컨테이너가 내장되어 있어 변경이 수비다. Spring Framework 5부터 WebFlux 애플리케이션은 Servlet API를 직접 사용하지 않고 Servlet 컨테이너가 아닌 서버(예: Netty)에서 실행될 수 있다.

*Spring continues to innovate and to evolve. Beyond the Spring Framework, there are other projects, such as Spring Boot, Spring Security, Spring Data, Spring Cloud, Spring Batch, among others. It’s important to remember that each project has its own source code repository, issue tracker, and release cadence. See [spring.io/projects](https://spring.io/projects) for the complete list of Spring projects.*

Spring은 계속해서 혁신하고 진화하고 있다. Spring Framework 외에도 Spring Boot, Spring Security, Spring Data, Spring Cloud, Spring Batch 등과 같은 다른 프로젝트가 있다. 각 프로젝트에는 자체 소스 코드 저장소, 이슈 추적기 및 릴리스 흐름이 있다는 점을 기억하는 것이 중요하다. Spring 프로젝트의 전체 목록은 [spring.io/projects](https://spring.io/projects)를 참조하라.

## 【0.4】디자인 철학
¶ Design Philosophy

*When you learn about a framework, it’s important to know not only what it does but what principles it follows. Here are the guiding principles of the Spring Framework:*

프레임워크에 대해 배울 때 프레임워크가 수행하는 작업뿐만 아니라 따르는 원칙도 아는 것이 중요하다. Spring Framework의 기본 원칙은 다음과 같다.

- *Provide choice at every level. Spring lets you defer design decisions as late as possible. For example, you can switch persistence providers through configuration without changing your code. The same is true for many other infrastructure concerns and integration with third-party APIs.*
- *Accommodate diverse perspectives. Spring embraces flexibility and is not opinionated about how things should be done. It supports a wide range of application needs with different perspectives.*
- *Maintain strong backward compatibility. Spring’s evolution has been carefully managed to force few breaking changes between versions. Spring supports a carefully chosen range of JDK versions and third-party libraries to facilitate maintenance of applications and libraries that depend on Spring.*
- *Care about API design. The Spring team puts a lot of thought and time into making APIs that are intuitive and that hold up across many versions and many years.*
- *Set high standards for code quality. The Spring Framework puts a strong emphasis on meaningful, current, and accurate javadoc. It is one of very few projects that can claim clean code structure with no circular dependencies between packages.*

- 모든 수준에서 선택권을 제공하라. Spring을 사용하면 디자인 결정을 가능한 한 늦게 연기 할 수 있다. 예를 들어, 코드를 변경하지 않고도 구성을 통해 지속성 공급자를 전환할 수 있다. 다른 많은 인프라 문제 및 타사 API와의 통합에서도 마찬가지이다.
- 다양한 관점을 수용하라. Spring은 유연성을 수용하며 작업 수행 방법에 대해 고집을 부리지 않는다. 다양한 관점으로 광범위한 애플리케이션 요구 사항을 지원한다.
- 강력한 이전 버전과의 호환성을 유지하라. Spring의 발전은 버전 간 주요 변경 사항을 거의 강제하지 않도록 신중하게 관리되었다. Spring은 Spring에 의존하는 애플리케이션과 라이브러리 유지 관리를 용이하게 하기 위해 신중하게 선택된 다양한 JDK 버전과 타사 라이브러리를 지원한다.
- API 디자인에 신경쓰라. Spring 팀은 직관적이고 여러 버전과 수년에 걸쳐 유지되는 API를 만들기 위해 많은 생각과 시간을 투자한다.
- 코드 품질에 대한 높은 기준을 설정하라. Spring Framework는 의미 있고 최신이며 정확한 javadoc에 중점을 둔다. 패키지 간 순환 종속성이 없는 깔끔한 코드 구조를 주장할 수 있는 몇 안되는 프로젝트 중 하나이다.

## 【0.5】피드백 및 기여
¶ Feedback and Contributions

*For how-to questions or diagnosing or debugging issues, we suggest using Stack Overflow. Click [here](https://stackoverflow.com/questions/tagged/spring+or+spring-mvc+or+spring-aop+or+spring-jdbc+or+spring-r2dbc+or+spring-transactions+or+spring-annotations+or+spring-jms+or+spring-el+or+spring-test+or+spring+or+spring-orm+or+spring-jmx+or+spring-cache+or+spring-webflux+or+spring-rsocket?tab=Newest) for a list of the suggested tags to use on Stack Overflow. If you’re fairly certain that there is a problem in the Spring Framework or would like to suggest a feature, please use the [GitHub Issues](https://github.com/spring-projects/spring-framework/issues).*

방법에 대한 질문이나 문제 진단 또는 디버깅의 경우 스택 오버플로를 사용하는 것이 좋다. Stack Overflow에서 사용할 수 있는 추천 태그 목록을 보려면 [이곳](https://stackoverflow.com/questions/tagged/spring+or+spring-mvc+or+spring-aop+or+spring-jdbc+or+spring-r2dbc+or+spring-transactions+or+spring-annotations+or+spring-jms+or+spring-el+or+spring-test+or+spring+or+spring-orm+or+spring-jmx+or+spring-cache+or+spring-webflux+or+spring-rsocket?tab=Newest)을 클릭하라. Spring Framework에 문제가 있다고 확신하거나 기능을 제안하고 싶다면 [GitHub Issues](https://github.com/spring-projects/spring-framework/issues)를 사용하라.

## 【0.6】시작하기
¶ Getting Started

*If you are just getting started with Spring, you may want to begin using the Spring Framework by creating a [Spring Boot](https://spring.io/projects/spring-boot/)-based application. Spring Boot provides a quick (and opinionated) way to create a production-ready Spring-based application. It is based on the Spring Framework, favors convention over configuration, and is designed to get you up and running as quickly as possible.*

방금 Spring을 시작했다면 [Spring Boot](https://spring.io/projects/spring-boot/) 기반 애플리케이션을 생성하여 Spring Framework 사용을 시작할 수 있다. Spring Boot는 프로덕션에 즉시 사용 가능한 Spring 기반 애플리케이션을 생성하는 빠르고 독창적인 방법을 제공한다. 이는 Spring Framework를 기반으로 하며 구성보다 규칙을 선호하며 가능한 한 빨리 시작하고 실행할 수 있도록 설계되었다.

# 【1】핵심기술
¶ Core Technologies

*This part of the reference documentation covers all the technologies that are absolutely integral to the Spring Framework.*

참조 문서의 이 부분은 Spring Framework에 절대적으로 필수적인 모든 기술을 다루고 있다.

*Foremost amongst these is the Spring Framework’s Inversion of Control (IoC) container. A thorough treatment of the Spring Framework’s IoC container is closely followed by comprehensive coverage of Spring’s Aspect-Oriented Programming (AOP) technologies. The Spring Framework has its own AOP framework, which is conceptually easy to understand and which successfully addresses the 80% sweet spot of AOP requirements in Java enterprise programming.*

그 중 가장 중요한 것은 Spring Framework의 IoC(Inversion Of Control) 컨테이너이다. Spring Framework의 IoC 컨테이너에 대한 철저한 처리는 Spring의 AOP(Aspect-Oriented Programming) 기술에 대한 포괄적인 적용으로 밀접하게 이어진다. Spring Framework에는 개념적으로 이해하기 쉽고 Java 엔터프라이즈 프로그래밍에서 AOP 요구 사항의 80%를 성공적으로 해결하는 자체 AOP 프레임워크가 있다.

*Coverage of Spring’s integration with AspectJ (currently the richest — in terms of features — and certainly most mature AOP implementation in the Java enterprise space) is also provided.*

AspectJ(현재 기능 측면에서 가장 풍부하고 확실히 Java 엔터프라이즈 공간에서 가장 성숙한 AOP 구현)와의 Spring 통합에 대한 내용도 제공된다.

*AOT processing can be used to optimize your application ahead-of-time. It is typically used for native image deployment using GraalVM.*

AOT 처리를 사용하면 애플리케이션을 미리 최적화할 수 있다. 일반적으로 GraalVM을 사용한 기본 이미지 배포에 사용된다.

## 【1.1】IoC 컨테이너
¶ The IoC Container

*This chapter covers Spring’s Inversion of Control (IoC) container.*

이 장에서는 Spring의 IoC(Inversion of Control) 컨테이너를 다룬다.

## 【1.1.1】Spring IoC 컨테이너 및 Bean 소개
¶ Introduction to the Spring IoC Container and Beans

*This chapter covers the Spring Framework implementation of the Inversion of Control (IoC) principle. Dependency injection (DI) is a specialized form of IoC, whereby objects define their dependencies (that is, the other objects they work with) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. The IoC container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes or a mechanism such as the Service Locator pattern.*

이 장에서는 IoC(Inversion of Control) 원칙의 Spring Framework 구현을 다룬다. DI(종속성 주입)는 IoC의 특수한 형식으로, 객체는 생성자 인수, 팩토리 메서드에 대한 인수 또는 그 뒤의 객체 인스턴스에 설정된 속성을 통해서만 종속성(즉, 함께 작업하는 다른 객체)을 정의한다. 팩토리 메서드에서 생성되거나 반환된다. 그런 다음 IoC 컨테이너는 Bean을 생성할 때 이러한 종속성을 주입한다. 이 프로세스는 기본적으로 클래스의 직접 구성이나 서비스 로케이터 패턴과 같은 매커니즘을 사용하여 종속성의 인스턴스화 또는 위치를 제어하는 Bean 자체의 역(따라서 이름이 제어의 역전)이다.

*The `org.springframework.beans` and `org.springframework.context` packages are the basis for Spring Framework’s IoC container. The `BeanFactory` interface provides an advanced configuration mechanism capable of managing any type of object. `ApplicationContext` is a sub-interface of `BeanFactory`. It adds:*

- Easier integration with Spring’s AOP features
- Message resource handling (for use in internationalization)
- Event publication
- Application-layer specific contexts such as the WebApplicationContext for use in web applications.

`org.springframework.benas` 및 `org.springframework.context`패키지는 Spring Framework의 IoC 컨테이너의 기초이다. BeanFactory 인터페이스는 모든 유형의 객체를 관리할 수 있는 고급 구성 매커니즘을 제공한다. `ApplicationContext`는 `BeanFactory`의 하위 인터페이스이다. 그것은 다음을 추가 한다.

- Spring의 AOP 기능과 더 쉬운 통합
- 메시지 리소스 처리(국제화에 사용)
- 이벤트 게재
- 웹 애플리케이션에서 사용하기 위한 `WebApplicationContext`와 같은 애플리케이션 계층별 컨텍스트
  
*In short, the `BeanFactory` provides the configuration framework and basic functionality, and the `ApplicationContext` adds more enterprise-specific functionality. The `ApplicationContext` is a complete superset of the `BeanFactory` and is used exclusively in this chapter in descriptions of Spring’s IoC container. For more information on using the BeanFactory instead of the `ApplicationContext`, see the section covering the `BeanFactory` [API](https://docs.spring.io/spring-framework/reference/core/beans/beanfactory.html).*

간단히 말해서 `BeanFactory`는 구성 프레임워크와 기본 기능을 제공하고 `ApplicationContext`는 더 많은 기업별 기능을 추가한다. `ApplicationContext`는 `BeanFactory`의 완전한 상위 집합이며 이 장에서는 Spring의 IoC 컨테이너 설명에 독점적으로 사용된다. `ApplicationContext` 대신 `BeanFactory`를 사용하는 방법에 대한 자세한 내용은 `BeanFactory` [API](https://docs.spring.io/spring-framework/reference/core/beans/beanfactory.html)를 다루는 섹션을 참조하라.

## 【1.1.2】컨테이너 개요
¶ Container Overview

*The `org.springframework.context.ApplicationContext` interface represents the Spring IoC container and is responsible for instantiating, configuring, and assembling the beans. The container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata. The configuration metadata is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.*

`org.springframework.context.ApplicationContext` 인터페이스는 Spring IoC 컨테이너를 나타내며 빈의 인스턴스화, 구성 및 조립을 담당한다. 컨테이너는 구성 메타데이터를 읽어 어떤 개체를 인스턴스화하고, 구성하고, 어셈블할지에 대한 지침을 얻는다. 구성 메타데이터는 XML, Java 주석(Annotation) 또는 Java 코드로 표시된다. 이를 통해 애플리케이션을 구성하는 개체와 해당 개체 간의 풍부한 상호 종속성을 표현할 수 있다.

*Several implementations of the `ApplicationContext` interface are supplied with Spring. In stand-alone applications, it is common to create an instance of `ClassPathXmlApplicationContext` or `FileSystemXmlApplicationContext`. While XML has been the traditional format for defining configuration metadata, you can instruct the container to use Java annotations or code as the metadata format by providing a small amount of XML configuration to declaratively enable support for these additional metadata formats.*

`ApplicationContext` 인터페이스의 여러 구현이 Spring과 함께 제공된다. 독립형 애플리케이션에서는 `ClassPathXmlApplicationContext` 또는 `FileSystemXmlApplicationContext`의 인스턴스를 생성하는 것이 일반적이다. XML은 구성 메타데이터를 정의하기 위한 전통적인 형식이었지만, 이러한 추가 메타데이터 형식에 대한 지원을 선언적으로 활성화하기 위해 소량의 XML 구성을 제공함으로써 Java 주석이나 코드를 메타데이터 형식으로 사용하도록 컨테이너에 지시할 수 있다.

*In most application scenarios, explicit user code is not required to instantiate one or more instances of a Spring IoC container. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the `web.xml` file of the application typically suffices (see [Convenient ApplicationContext Instantiation for Web Applications](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create)). If you use the [Spring Tools for Eclipse](https://spring.io/tools) (an Eclipse-powered development environment), you can easily create this boilerplate configuration with a few mouse clicks or keystrokes.*

대부분의 애플리케이션 시나리오에서는 Spring IoC 컨테이너의 하나 이상의 인스턴스를 인스턴스화하는 데 명시적인 사용자 코드가 필요하지 않다. 예를 들어, 웹 애플리케이션 시나리오에서는 일반적으로 애플리케이션의 `web.xml` 파일에 있는 상용구 웹 설명자 XML의 간단한 8줄이면 충분하다(참고 [Convenient ApplicationContext Instantiation for Web Applications](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create)). [Eclipse 용 Spring Toos](https://spring.io/tools)(Eclipse기반 개발 환경)를 사용하는 경우 몇 번의 마우스 클릭이나 키 입력만으로 이러한 상용구 구성을 쉽게 생성할 수 있다.

*The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the `ApplicationContext`` is created and initialized, you have a fully configured and executable system or application.*

다음 다이어그램은 Spring이 작동하는 방식에 대한 높은 수준의 보기를 보여준다. 애플리케이션 클래스는 구성 메타데이터와 결합되므로 `ApplicationContext`가 생성되고 초기화된 후 완전히 구성되고 실행 가능한 시스템 또는 애플리케이션을 갖게 된다.

![https://docs.spring.io/spring-framework/reference/_images/container-magic.png](/asset/attach/2024-01-22-spring-framework/The-Spring-IoC-container.png)

## 【1.1.2.1】구성 메타데이터
¶ Configuration Metadata

*As the preceding diagram shows, the Spring IoC container consumes a form of configuration metadata. This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.*

이전 다이어그램에서 볼 수 있듯이 Spring IoC 컨테이너는 구성 메타데이터 형식을 사용한다. 이 구성 메타데이터는 애플리케이션 개발자로서 Spring 컨테이너 애플리케이션의 객체를 인스턴스화, 구성 및 어셈블하도록 지시하는 방법을 나타낸다.

*Configuration metadata is traditionally supplied in a simple and intuitive XML format, which is what most of this chapter uses to convey key concepts and features of the Spring IoC container.*

구성 메타데이터는 전통적으로 간단하고 직관적인 XML 형식으로 제공되며, 이 장의 대부분은 Spring IoC 컨테이너의 주요 개념과 기능을 전달하는 데 사용된다.

> **Note**
> 
> *XML-based metadata is not the only allowed form of configuration metadata. The Spring IoC container itself is totally decoupled from the format in which this configuration metadata is actually written. These days, many developers choose [Java-based configuration](https://docs.spring.io/spring-framework/reference/core/beans/java.html) for their Spring applications.*  
>
> XML 기반 메타데이터는 구성 메타데이터의 유일한 허용 형식이 아니다. Spring IoC 컨테이너 자체는 이 구성 메타데이터가 실제로 작성되는 형식과 완전히 분리되어 있다. 요즘에는 많은 개발자가 Spring 애플리케이션에 대해 [Java 기반 구성](https://docs.spring.io/spring-framework/reference/core/beans/java.html)을 선택한다.

*For information about using other forms of metadata with the Spring container, see:*

- *[Annotation-based configuration](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html): define beans using annotation-based configuration metadata.*
- *[Java-based configuration](https://docs.spring.io/spring-framework/reference/core/beans/java.html): define beans external to your application classes by using Java rather than XML files. To use these features, see the `@Configuration`, `@Bean`, `@Import`, and `@DependsOn` annotations.*

Spring 컨테이너에서 다른 형태의 메타데이터를 사용하는 방법에 대한 자세한 내용은 다음을 참조하라.

- [주석(Annotation) 기반 구성](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html): 주석 기반 구성 메타데이터를 사용하여 Bean을 정의한다.  
- [Java 기반 구성](https://docs.spring.io/spring-framework/reference/core/beans/java.html): XML 파일이 아닌 Java를 사용하여 애플리케이션 클래스 외부에 Bean을 정의한다. 이러한 기능을 사용하려면 `@Configuration`, `@Bean`, `@Import` 및 `@DependsOn` 주석을 참조하라.

*Spring configuration consists of at least one and typically more than one bean definition that the container must manage. XML-based configuration metadata configures these beans as `<bean/>` elements inside a top-level `<beans/>` element. Java configuration typically uses `@Bean-annotated` methods within a `@Configuration` class.*

Spring 구성은 컨테이너가 관리해야 하는 적어도 하나, 일반적으로 하나 이상의 Bean 정의로 구성된다. XML 기반 구성 메타데이터는 이러한 Bean을 최상위 `<beans/>` 요소 내의 `<bean/>` 요소로 구성한다. Java 구성은 일반적으로 `@Configuration` 클래스 내에서 `@Bean` 주석이 달린 메서드를 사용한다.

*These bean definitions correspond to the actual objects that make up your application. Typically, you define service layer objects, persistence layer objects such as repositories or data access objects (DAOs), presentation objects such as Web controllers, infrastructure objects such as a JPA `EntityManagerFactory`, JMS queues, and so forth. Typically, one does not configure fine-grained domain objects in the container, because it is usually the responsibility of repositories and business logic to create and load domain objects.*

이러한 빈 정의는 애플리케이션을 구성하는 실제 객체에 해당한다. 일반적으로 서비스 계층 객체, 저장소나 DAO(데이터 액세스 객체)와 같은 지속성 계층 객체, 웹 컨트롤러와 같은 프리젠테이션 객체, JPA `ENtityManagerFactory`와 같은 인프라 객체, JMS 큐 등을 정의한다. 일반적으로 도메인 개체를 생성하고 로드하는 것은 일반적으로 리포지토리와 비즈니스 논리의 책임이기 때문에 컨테이너에서 세분화된 도메인 개체를 구성하지 않는다.

*The following example shows the basic structure of XML-based configuration metadata:*

다음 예에서는 XML 기반 구성 메타데이터의 기본 구조를 보여준다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="..." class="..."> ① ②
		<!-- collaborators and configuration for this bean go here -->
	</bean>

	<bean id="..." class="...">
		<!-- collaborators and configuration for this bean go here -->
	</bean>

	<!-- more bean definitions go here -->

</beans>
```

① `id`` 속성은 개별 빈 정의를 식별하는 문자열이다.

*The id attribute is a string that identifies the individual bean definition.*

② `class` 속성은 Bean의 유형을 정의하고 완전한 클래스 이름을 사용한다.

*The class attribute defines the type of the bean and uses the fully qualified class name.*

## 【1.1.2.2】컨테이너 인스턴스화
¶ Instantiating a Container

*The location path or paths supplied to an `ApplicationContext` constructor are resource strings that let the container load configuration metadata from a variety of external resources, such as the local file system, the Java `CLASSPATH`, and so on.*

`ApplicationContext` 생성자에 제공된 위치 경로는 컨테이너가 로컬 파일 시스템, Java `CLASSPATH` 등과 같은 다양한 외부 리소스에서 구성 메타데이터를 로드할 수 있도록 하는 리소스 문자열이다.

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

> **Note**
>
> *After you learn about Spring’s IoC container, you may want to know more about Spring’s `Resource` abstraction (as described in [Resources](https://docs.spring.io/spring-framework/reference/web/webflux-webclient/client-builder.html#webflux-client-builder-reactor-resources)) which provides a convenient mechanism for reading an InputStream from locations defined in a URI syntax. In particular, `Resource` paths are used to construct applications contexts, as described in [Application Contexts and Resource Paths](https://docs.spring.io/spring-framework/reference/core/resources.html#resources-app-ctx).*
>
> Spring의 IoC 컨테이너에 대해 배운 후에는 URI 구문에 정의된 위치에서 InputStream을 읽는 편리한 메커니즘을 제공하는 Spring의 `Resource` 추상화([리소스](https://docs.spring.io/spring-framework/reference/web/webflux-webclient/client-builder.html#webflux-client-builder-reactor-resources)에 대해 설명됨)에 대해 더 알고 싶을 수 있다. 특히 리소스 경로는 [애플리케이션 컨텍스트 및 `Resource` 경로](https://docs.spring.io/spring-framework/reference/core/resources.html#resources-app-ctx)에 설명된 대로 애플리케이션 컨텍스를 구성하는 데 사용된다.

*The following example shows the service layer objects `(services.xml)` configuration file:*

다음 예에서는 서비스 계층 개체 `services.xml` 구성 파일을 보여준다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

	<!-- services -->

	<bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
		<property name="accountDao" ref="accountDao"/>
		<property name="itemDao" ref="itemDao"/>
		<!-- additional collaborators and configuration for this bean go here -->
	</bean>

	<!-- more bean definitions for services go here -->

</beans>
```

*The following example shows the data access objects daos.xml file:*

다음 예에서는 데이터 액세스 개체 `daos.xml` 파일을 보여준다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="accountDao"
		class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
		<!-- additional collaborators and configuration for this bean go here -->
	</bean>

	<bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
		<!-- additional collaborators and configuration for this bean go here -->
	</bean>

	<!-- more bean definitions for data access objects go here -->

</beans>
```

*In the preceding example, the service layer consists of the `PetStoreServiceImpl` class and two data access objects of the types `JpaAccountDao` and `JpaItemDao` (based on the JPA Object-Relational Mapping standard). The `property name` element refers to the name of the JavaBean property, and the `ref` element refers to the name of another bean definition. This linkage between id and `ref` elements expresses the dependency between collaborating objects. For details of configuring an object’s dependencies, see [Dependencies](https://docs.spring.io/spring-framework/reference/core/beans/dependencies.html).*

앞의 예에서 서비스 계층은 `PetStoreServiceImpl` 클래스와 `JpaAccountDao` 및 `JpaItemDao` 유형(JPA 객체 관계형 매핑 표준 기반)의 두 액세스 개체로 구성된다. `property name` 요소는 JavaBean 속성의 이름을 참조하고, `ref` 요소는 다른 빈 정의의 이름을 참조한다. id와 `ref` 요소 간의 이러한 연결은 공동 작업 개체 간의 종속성을 표현한다. 개체의 종속성 구성에 대한 자세한 내용은 [종속성](https://docs.spring.io/spring-framework/reference/core/beans/dependencies.html)을 참조하라.

## 【1.1.2.3】XML 기반 구성 메타데이터 작성
¶ Composing XML-based Configuration Metadata

*It can be useful to have bean definitions span multiple XML files. Often, each individual XML configuration file represents a logical layer or module in your architecture.*

여러 XML 파일에 걸쳐 빈 정의를 갖는 것이 유용할 수 있다. 객 개별 XML 구성 파일은 아키텍처의 논리적 계층이나 모듈을 나타내는 경우가 많다.

*You can use the application context constructor to load bean definitions from all these XML fragments. This constructor takes multiple `Resource` locations, as was shown in the previous section. Alternatively, use one or more occurrences of the `<import/>` element to load bean definitions from another file or files. The following example shows how to do so:*

애플리케이션 컨텍스트 생성자를 사용하여 이러한 모든 XML 조각에서 Bean 정의를 로드할 수 있다. 이 생성자는 이전 섹션에 표시된대로 여러 `Resource` 위치를 사용한다. 대안으로, 하나 이상의 `<import/>` 요소를 사용하여 다른 파일에서 Bean 정의를 로드하라. 다음 예에서는 그 방법을 보여준다.

```xml
<beans>
	<import resource="services.xml"/>
	<import resource="resources/messageSource.xml"/>
	<import resource="/resources/themeSource.xml"/>

	<bean id="bean1" class="..."/>
	<bean id="bean2" class="..."/>
</beans>
```

*In the preceding example, external bean definitions are loaded from three files: `services.xml`, `messageSource.xml`, and `themeSource.xml`. All location paths are relative to the definition file doing the importing, so `services.xml` must be in the same directory or classpath location as the file doing the importing, while `messageSource.xml` and `themeSource.xml` must be in a `resources` location below the location of the importing file. As you can see, a leading slash is ignored. However, given that these paths are relative, it is better form not to use the slash at all. The contents of the files being imported, including the top level `<beans/>` element, must be valid XML bean definitions, according to the Spring Schema.*

이전 예제에서 외부 Bean 정의는 `services.xml`, `messageSource.xml` 및 `themeSource.xml`의 세가지 파일에서 로드된다. 모든 위치 경로는 가져오기를 수행하는 정의 파일에 상대적이므로 `services.xml`은 가져오기를 수행하는 파일과 동일한 디렉터리 또는 클래스 경로 위치에 있어야 하고 `messageSource.xml` 및 `themeSource.xml`은 해당 위치 아래의 리소스 위치에 있어야 한다. 가져오기 파일의 보다시피 선행 슬래시는 무시된다. 그러나 이러한 경로는 상대적이므로 슬래시를 전혀 사용하지 않는 것이 더 좋다. 최상위 레벨 `<beans/>` 요소를 포함하여 가져오는 파일의 컨텐츠는 Spring 스키마에 따라 유효한 XML Bean 정의여야 한다.

> **Note**
>
> *It is possible, but not recommended, to reference files in parent directories using a relative "../" path. Doing so creates a dependency on a file that is outside the current application. In particular, this reference is not recommended for `classpath:` URLs (for example, `classpath:../services.xml`), where the runtime resolution process chooses the “nearest” classpath root and then looks into its parent directory. Classpath configuration changes may lead to the choice of a different, incorrect directory.*
>
> *You can always use fully qualified resource locations instead of relative paths: for example, `file:C:/config/services.xml` or `classpath:/config/services.xml`. However, be aware that you are coupling your application’s configuration to specific absolute locations. It is generally preferable to keep an indirection for such absolute locations — for example, through "${…​}" placeholders that are resolved against JVM system properties at runtime.*
>
> 상대 "../" 경로를 사용하여 상위 디렉터리의 파일을 참조하는 것이 가능하지만 권장되지는 않는다. 이렇게 하면 현재 애플리케이션 외부에 있는 파일에 대한 종속성이 생성된다. 특히 이 참조는 런타임 확인 프로세스가 "가장 가까운" 클래스 경로 루트를 선택한 다음 해당 상위 디렉터리를 조사하는 `classpath:` URL(예: `classpath:../services.xml)`에는 권장되지 않는다. 클래스 경로 구성 변경으로 인해 다른 잘못된 디렉터리가 선택될 수 있다.
>
> 상대 경로 대신 항상 정규화된 리소스 위치를 사용할 수 있다(예: `file:C:/config/services.xml` 또는 `classpath:/config/services.xml`). 그러나 애플리케이션 구성을 특정 절대 위치에 결합하고 있다는 점에 유의하라. 일반적으로 런타임 시 JVM 시스템 속성에 대해 확인되는 "${...}" 자리 표시자를 통해 이러한 절대 위치에 대한 간접 참조를 유지하는 것이 좋다.

*The namespace itself provides the import directive feature. Further configuration features beyond plain bean definitions are available in a selection of XML namespaces provided by Spring — for example, the `context` and `util` namespaces.*

네임스페이스 자체는 import 지시문 기능을 제공한다. 일반 빈 정의 이상의 추가 구성 기능은 Spring이 제공하는 XML 네임스페이스 선택(예: `context` 및 `util` 네임스페이스)에서 사용할 수 있다.

## 【1.1.2.4】Groovy Bean 정의 DSL
¶ The Groovy Bean Definition DSL

*As a further example for externalized configuration metadata, bean definitions can also be expressed in Spring’s Groovy Bean Definition DSL, as known from the Grails framework. Typically, such configuration live in a ".groovy" file with the structure shown in the following example:*

외부화된 구성 메타데이터에 대한 추가 예로서, Grails 프레임워크에서 알려진 것처럼 Bean 정의는 Spring의 Groovy Bean 정의 DSL로 표현될 수도 있다. 일반적으로 이러한 구성은 다음 예에 표시된 구조를 사용하여 ".groovy" 파일에 있다.

```groovy
beans {
	dataSource(BasicDataSource) {
		driverClassName = "org.hsqldb.jdbcDriver"
		url = "jdbc:hsqldb:mem:grailsDB"
		username = "sa"
		password = ""
		settings = [mynew:"setting"]
	}
	sessionFactory(SessionFactory) {
		dataSource = dataSource
	}
	myService(MyService) {
		nestedBean = { AnotherBean bean ->
			dataSource = dataSource
		}
	}
}
```

*This configuration style is largely equivalent to XML bean definitions and even supports Spring’s XML configuration namespaces. It also allows for importing XML bean definition files through an `importBeans` directive.*

이 구성 스타일은 XML Bean 정의와 거의 동일하며 Spring의 XML 구성 네임스페이스도 지원한다. 또한 `importBeans` 지시어를 통해 XML 빈 정의 파일을 가져올 수 있다.

## 【1.1.2.5】컨테이너 사용
¶ Using the Container

*The `ApplicationContext` is the interface for an advanced factory capable of maintaining a registry of different beans and their dependencies. By using the method `T getBean(String name, Class<T> requiredType)`, you can retrieve instances of your beans.*

`ApplicationContext`는 다양한 빈의 레지스트리와 해당 종속성을 유지 관리할 수 있는 고급 팩토리를 위한 인터페이스이다. `T getBean(String name, Class<T> requiredType)` 메소드를 사용하여 Bean의 인스턴스를 검색할 수 있다.

```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

*With Groovy configuration, bootstrapping looks very similar. It has a different context implementation class which is Groovy-aware (but also understands XML bean definitions). The following example shows Groovy configuration:*

Groovy 구성을 사용하면 부트스트래핑이 매우 유사해 보인다. Groovy를 인식하는(그러나 XML Bean 정의도 이해하는) 다른 컨텍스트 구현 클래스가 있다. 다음 예에서는 Groovy 구성을 보여준다.

```java
ApplicationContext context = new GenericGroovyApplicationContext("services.groovy", "daos.groovy");
```

*The most flexible variant is `GenericApplicationContext` in combination with reader delegates — for example, with `XmlBeanDefinitionReader` for XML files, as the following example shows:*

가장 유연한 변형은 판독기 대리자와 결합된 `GenericApplicationContext`이다. 예를 들어 다음 예제에서 볼 수 있듯이 XML 파일용 `XmlBeanDefinitionReader`를 사용한다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

*You can also use the `GroovyBeanDefinitionReader` for Groovy files, as the following example shows:*

다음 예제와 같이 Groovy 파일에 `GroovyBeanDefinitionReader`를 사용할 수도 있다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy");
context.refresh();
```

*You can mix and match such reader delegates on the same `ApplicationContext`, reading bean definitions from diverse configuration sources.*

다양한 구성 소스에서 Bean 정의를 읽어 동일한 `ApplicationContext`에서 이러한 판독기 대리자를 혼합하고 일치시킬 수 있다.

*You can then use `getBean` to retrieve instances of your beans. The `ApplicationContext` interface has a few other methods for retrieving beans, but, ideally, your application code should never use them. Indeed, your application code should have no calls to the `getBean()` method at all and thus have no dependency on Spring APIs at all. For example, Spring’s integration with web frameworks provides dependency injection for various web framework components such as controllers and JSF-managed beans, letting you declare a dependency on a specific bean through metadata (such as an autowiring annotation).*

그런 다음 `getBean`을 사용하여 Bean의 인스턴스를 검색할 수 있다. `ApplicationContext` 인터페이스에는 Bean을 검색하기 위한 몇 가지 다른 메소드가 있지만 이상적으로는 애플리케이션 코드에서 이를 사용해서는 안된다. 실제로 애플리케이션 코드에는 `getBean()` 메서드에 대한 호출이 전혀 없어야 하며 따라서 Spring API에 전혀 종속성이 없어야 한다. 예를 들어 Spring의 웹 프레임워크 통합은 컨트롤러 및 JSF 관리 빈과 같은 다양한 웹 프레임워크 구성요소에 대한 종속성 주입을 제공하여 메타데이터(예: 종속성 자동주입)를 통해 특정 빈에 대한 종속성을 선언할 수 있게 해준다.