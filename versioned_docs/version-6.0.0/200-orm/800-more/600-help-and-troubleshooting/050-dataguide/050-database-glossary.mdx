---
title: 'Glossary of common database terminology'
metaTitle: "Database glossary | Prisma's Data Guide"
metaDescription: 'Database terminology can be difficult to understand.  This glossary was designed to help you learn important terminology by providing definitions and context in one place.'
---

## Introduction

When dealing with databases, there is a lot of terminology that you must learn in order to understand the technology, how best to use it, and how it relates to other parts of your environment. This glossary aims to collect common terminology used in the database community and provide definitions and context to help you grow your knowledge.

This glossary is a work in progress and a living document. We intend to update it to add new topics and refine the existing entries as time goes on. We have a backlog of terms we hope to add in the near future, but if you have anything you'd like us to talk about, please open a [GitHub issue](https://github.com/prisma/docs/issues/new?title=Glossary%20suggestion%3A%20) to add your suggestions.

## Terminology

#### 1NF
1NF, or first normal form, describes a type of database normalization where
  each table column only has a single value. A column that has a nested table as
  a value or multiple values is not in 1NF.

#### 2NF
2NF, or second normal form, describes a type of database normalization that:
  1) satisfies the requirements of 1NF,
  2) has no values that are tied directly
  to a subset of a candidate key. In other words, a relation is in 2NF if it is
  in 1NF and all of the non-candidate values are dependent on the composite key
  in whole, not just a portion of the candidate key. For example, a `book` table
  that has a candidate key composed of `title` and `author` cannot be in 2NF if
  it also includes a `dob` field describing the author's date of birth. That
  column value is dependent only on the value of `author` and could lead to
  inconsistencies if the values get out of sync.

#### 3NF
3NF, or third normal form, describes a type of database normalization that:
  1) satisfies the requirements of 2NF,
  2) each non-key attribute is not
  transitively dependent on a key attribute. For example, if a `user` table has
  a `user_id` column as a primary key, a `user_city` column, and a `user_state`
  column, it would not be in 3NF because `user_state` is transitively dependent
  on `user_id` through `user_city` (the city and state should be extracted to
  their own table and referenced together).

#### 4NF
4NF, or fourth normal form, describes a type of database normalization that:
  1) satisfies the requirements of BCNF,
  2) for every non-trivial multivalued
  dependency, the determining attribute in the dependency is either a candidate
  key or a superset of it. In other words, if a field has multiple dependent
  fields that are independent from one another, it can lead to redundancies that
  violate 4NF rules.

#### ACID
ACID — an acronym created from the words atomicity, consistency, isolation,
  and durability — describes a set of characteristics that database transactions
  are meant to provide. Atomicity guarantees that all operations in a
  transaction will complete successfully or will be rolled back. Consistency,
  often considered a property maintained by the application rather than the
  database, is often achieved through transactions to make sure that all related
  values are updated at once. Transaction isolation aims to allow simultaneous
  transactions to execute independently. Durability means that transactions are
  meant to be stored on non-volatile storage when committed.

#### Access control list (ACL)
An access control list, often shortened to ACL, is a security policy list that
  dictates which actions each user or process can perform on which resources.
  There are many different types of ACLs, but they each describe the permissions
  and access patterns that are allowed by a system.

#### Active record ORM
An active record ORM is an object-relational mapper that functions by trying
  to represent each table in a database as a class in the application. Each
  record in the table is represented as an instance of the class. Database
  entries are added and managed by interacting with these representations in the
  application.

#### Anti-caching
Anti-caching is a strategy that can be used when data is not found in the
  faster in-memory cache and must be retrieved from slower, persistent storage.
  The technique involves aborting the transaction and kicking off an
  asynchronous operation to fetch the data from the slower medium to memory. The
  transaction can be retried later and the information will be ready to be served
  from memory.

#### Atomicity
Atomicity is a quality mainly associated with database transactions that means
  that the operations encapsulated in the transaction are handled in an
  all-or-nothing fashion. This prevents partial updates from occurring where
  some operations were performed before an error condition arose, leading to
  inconsistent data. In the case of transactions, either all of the operations
  are committed or every operation is rolled back to leave the database in the
  same state that it was in when the transaction began.

#### Attributes
Attributes are characteristics that describe a certain entity in a database.
  In the ER (entity-relationship) model, attributes are any additional
  properties that are not relationships that add information about an entity.

#### Authentication
Authentication is an action that validates an identity. In computing and
  databases, authentication is mainly used as a way to prove that the person or
  process requesting access has the credentials to validate that they can
  operate with a specific identity. In practical terms, this might include
  providing an identity (like a username) and associated authentication material
  (such as a password, a certificate or key file, or a secret generated by a
  hardware device belonging to the person associated with the identity).
  Authentication is used in conjunction with authorization to determine if a
  user has permission to perform actions on a system.

#### Authorization
Authorization is an action that determines if a certain user or process should
  be allowed to perform a certain action. Authorization involves checking the
  requested action against a set of guidelines that describe who should be
  allowed to perform what actions. Authorization usually relies on a trusted
  authentication process to take place before the request in order to confirm
  the subject's identity.

#### Availability
Availability is a property that describes the degree to which a system is
  running and capable of performing work. In terms of computing systems like
  databases, for a single machine, availability is synonymous with the uptime of
  the application on that computer. For distributed systems, availability is
  subject to rules that dictate in what capacity the system is allowed to
  continue functioning if a subset of the system is unavailable.

#### BASE
BASE — an acronym created from the words Basically Available, Soft-state, and
  Eventually consistent — describes a set of characteristics of some NoSQL
  databases. It is offered as a description for certain databases that do not
  conform to the properties described by ACID-compliance (atomicity,
  consistency, isolation, and durability). BASE databases choose to remain
  available at the expense of strict data consistency in cases of network
  partitions. The soft-state component refers to the fact that the state of the
  system can be in flux as the different members negotiate the most correct
  values in the system. Eventually consistent is another related statement
  indicating that the system will eventually achieve consistency given enough
  time and assuming new inconsistencies aren't introduced during that time.

#### BCNF
BCNF, or Boyce-Codd normal form, describes a type of database normalization
  that:
  1) satisfies the requirements of 3NF,
  2) where the determining attribute
  in each dependency (the attribute that dictates another attribute's value) is
  either a _superset_ of the dependent attribute, is a candidate key, or is a
  superset of a candidate key.

#### Blue-green deployments
Blue-green deployments are a technique for deploying software updates with
  little to no downtime by managing active traffic between two identical sets of
  infrastructure. New releases can be deployed to the inactive infrastructure
  group and tested independently. To release the new version, a traffic routing
  mechanism is switched to direct traffic from the current infrastructure to the
  infrastructure with the new version. The previously-active infrastructure now
  functions as the target for the next updates. This strategy is helpful in that
  the routing mechanism can easily switch back and forth to roll backwards or
  forwards depending on the success of a deployment.

#### Bottleneck
In computing, a bottleneck occurs when the performance or capacity of a system
  is limited by contention around a single component. In databases, this can be
  related to the hardware that the database runs on or the network environment
  that is available. Application usage patterns can also affect which resource
  is most under contention. To solve bottlenecks, you must first identify the
  resource limiting your system's performance and then either add additional
  capacity or take measures to reduce the rate of usage.

#### CAP theorem
CAP theorem is a statement about distributed databases that states that any
  system can only provide at most two out of the following three qualities:
  consistency, availability, and partition tolerance. Generally, it is agreed
  that partition tolerance must be a feature of any distributed system (as the
  only way to avoid all network partitions is to have a non-distributed system).
  Therefore, each distributed system must make a decision as to whether they
  want to prioritize data consistency (by not accepting new changes in the case
  of a partition) or system availability (by sacrificing some consistency for
  the sake of still being able to introduce new changes during the partition).

#### CRUD
CRUD — an acronym standing for Create, Read, Update, and Delete — describes
  the basic operations that one uses to operate on stored data. In SQL, the
  components of CRUD broadly correspond to the operations `INSERT`, `SELECT`,
  `UPDATE`, and `DELETE`, but many other operations facilitate more granular
  actions. More generally, CRUD is also often discussed in the context of user
  interfaces and APIs as a description of the types of actions that a system may
  permit.

#### Cache
A cache is a component of a system designed to allow faster retrieval for high
  value or frequently requested pieces of data. In general, caches function by
  storing a useful fraction of data on media that is either higher performance
  or closer to the client than the general use persistent media focused on long
  term, non-volatile storage. In general, caches tend to be higher performance
  but tend to have more limited capacity and be more expensive.

#### Cache-aside
Cache-aside is a caching architecture that positions the cache outside of the
  regular path between application and database. In this arrangement, the
  application will fetch data from the cache if it is available there. If the
  data is not in the cache, the application will issue a separate query to the
  original data source to fetch the data and then write that data to the cache
  for subsequent queries. The minimal crossover between the cache and backing
  data source allows this architecture to be resilient against unavailable
  caches. Cache-aside is well-suited for read-heavy workloads.

#### Cache invalidation
Cache invalidation is the process of targeting and removing specific items
  from a cache. Most often, this is performed as part of a routine when updating
  records so that the data in the cache does not serve stale data to clients.

#### Canary releases
A canary release describes a release strategy where new versions of software
  are deployed to a small subset of servers to test new changes in an
  environment with limited impact. The deployment and resulting behavior of the
  test group are observed and the team can then decide if they want to roll back
  the changes or continue to deploy the changes to a wider range of hosts.
  Canary releases are a way of testing in production while limiting the number
  of clients impacted by any problems.

#### Candidate key
A candidate key in a relational database is the term for a minimal superkey.
  In other words, a candidate key is any column or combination of columns that
  can be used to uniquely identify each record in a relation without including
  columns that do not help in specificity. In a `cars` table, a unique `car_id`
  column would be a candidate key as well as a combination of the `make`,
  `model`, and `year` columns (assuming that's specific enough to eliminate any
  duplicates). However, `car_id` and `make` would not be a candidate key since
  in this instance, `make` does nothing to narrow down the uniqueness of each
  row.

#### Cascade
In relational databases, cascade is an option for how to handle deletes or
  updates for records that have related entries in other tables. Cascade means
  that the operation (delete or update) should be applied to the child,
  dependent rows as well. This helps you avoid orphaned rows in the case of
  deletes and out of sync values in the case of updates.

#### Cassandra
Apache Cassandra is a distributed, wide-column NoSQL database focused on
  operating on and managing large volumes of data. Cassandra scales incredibly
  well and each node in the cluster can accept reads or writes. Data is stored
  in rows that are uniquely identifiable and partitioned based on partition key.
  Each partition key returns a row of data with both column names and values
  defined internally, meaning each row in the same column family may contain
  different columns.

#### Check constraint
A check constraint is perhaps the most flexible table or column constraint
  that can be added to a relational database. It is defined as a boolean
  condition that must be met for the proposed data to be accepted by the system.
  Because the nature of the condition is fairly open-ended, check constraints
  can be used to model many different types of requirements to ensure that the
  data coming into the system conforms to expectations.

#### Cluster
In computing, a cluster is a group of computers all dedicated to helping with
  a shared task. Database clusters are used to increase the capacity,
  availability, and performance of certain types of actions compared to database
  deployed on a single computer. There are many different topologies,
  technologies, and trade-offs that different clustered systems employ to
  achieve different levels of performance or fault tolerance. Because of the
  diversity of different implementations, it can be difficult to generalize
  specific characteristics that apply to all clustered database systems.

#### Collation
Collation in databases refers to the ordering and comparison characteristics
  of different character systems. Most databases allow you to assign collation
  settings, which impact how text in the system are sorted, displayed, and
  compared against one another. Collation is often defined using a set of labels
  that describe the character set, language context, and different options about
  sensitivity or insensitivity to capitalization, accents, and other character
  modifiers.

#### Collections
In document databases, collections are containers that are used to store
  groups of documents together. The collections may have semantic meaning
  assigned by the application and database designers, but otherwise are simply a
  way to partition different sets of documents from one another in the system.
  Different collections can be assigned different properties and actions can be
  performed targeting specific collections of documents.

#### Column
Columns are a component of table-oriented databases that label and potentially
  define the type of each value stored in that column. In traditional relational
  databases, the properties of a series of columns are one of the primary ways
  of defining the properties of the table in general. Each row added to the
  table must provide values that conform to the requirements associated with the
  table's columns. In non-relational databases, columns can have many different
  properties. Generally, however, they are used to label and define the
  characteristics for values that records choose to store in that column.

#### Column database
A column database or column-oriented database is a table-oriented database
  similar to a traditional relational database that stores data in the
  background by column instead of by record. This means that the data associated
  with a single column are stored together rather than grouping all of the data
  associated with a single record. This can provide different performance
  characteristics depending on usage patterns, but generally doesn't affect how
  the user interacts with the data in the table on a daily basis. Although often
  confused in the literature, column databases are not to be confused with wide
  column databases or column family databases.

#### Column family
A column family is a database object that stores groups of key-value pairs
  where each key is a row identifier and each value is a group of column names
  and values. All together, a column family constructs something that is akin to
  a table in relational databases. However, each row can define its own columns,
  meaning that rows are of varying lengths and do not have to match each other
  in the columns represented or the data types stored.

#### Command query responsibility segregation (CQRS)
Command query responsibility segregation is an application design pattern that
  allows you to separate operations based on their impact on the underlying
  database. In general, this usually means providing different mechanisms for
  queries that read data versus queries that change data. Separating these two
  contexts allows you to make infrastructure and system changes to scale each
  use-case independently, increasing performance.

#### Commit
In the context of databases, committing data is the process whereby you
  execute and durably store a set of proposed actions. Many databases are
  configured to automatically commit each statement as it is received by the
  system, but transactions, for example, are one mechanism through which you can
  control the commit behavior of the database by grouping multiple statements
  together and committing them as a group. Committing in database is the action
  that is actually responsible for performing a permanent action on the system.

#### Composite key
In relational databases, a composite key is a key composed of two or more
  columns that can be used to uniquely identify any record in a table. For
  example, if we have a `shirts` table that only stores a single record for each
  combination of size and color could have a composite key defined by a
  combination of the `color` and `size` columns.

#### Concurrency
Concurrency is the ability of a system to work on multiple tasks at once
  without affecting the overall result. Concurrency allows systems to execute
  operations in parallel, increasing the relative performance of the group of
  tasks.

#### Connection pooling
Connection pooling is a strategy used to improve performance and avoid
  connection exhaustion by managing the connections between an application and
  database. It does this by maintaining a pool of connections to the database.
  By keeping the connections open and reusing them for multiple queries, the
  application can forgo the overhead of having to establish a connection each
  time and the database's connection limits can be managed by the pooling component.

#### Consistency
Consistency is a property of data systems that means that the individual data
  entities do not conflict and continue to model the information they intend to
  even as changes are introduced. Each piece of data and change must be
  validated to ensure that it conforms to the rules imposed on the data
  structures and care must be taken to balance out any changes that should
  impact other data (like debiting and crediting different accounts at the same
  time).

#### Constraint
A constraint is a limitation imposed on a specific column or table that
  impacts the range of values accepted by the system. Constraints are used to
  define rules that the database system can enforce to ensure that values
  conform to requirements.

#### Cursor
A database cursor is a way for clients to iterate over records and query
  results in a controlled, precise manner. Cursors are primarily used to page
  through results that match a query one-by-one by iteratively returning the
  next row for processing. This can help you operate on an unknown number of
  records by accessing the results as a queue. Care must be taken when using
  cursors as they take up resources on the database system, can result in
  locking, and often result in many more network round trips than would be
  required otherwise.

#### Dark launching
Dark launching is a deployment and release strategy that helps organizations
  test new changes in production contexts without affecting the user experience.
  Dark launching involves releasing new code in parallel to the original
  functionality. Requests and actions are then mirrored and run against both the
  old code and the new code. While the system's behavior from the user's
  perspective is only affected by the original code, the new code can be tested
  with real data to validate functionality and catch performance and functional
  problems. When properly vetted, the application can be altered to use the new
  code path exclusively.

#### Data
In the broadest sense, data are facts or pieces of information. They are
  measurements or values that contain information about something. In some
  contexts, data is defined as distinct from information in that information is
  analyzed or processed data while data consists only of raw values. Practically
  speaking, however, these terms are often used as synonyms and typically
  encapsulate any fact along with the relevant context necessary to interpret or
  contextualize it. Data is an essential component of almost all communication
  and activity and it can gain meaning and value as it is collected, analyzed,
  and contextualized.

#### Data definition language (DDL)
A data definition language, or DDL, is a set of commands or actions that are
  used to define database structures and objects. They are a key component to
  relational and other databases and are expressed as a subset of the available
  commands available to manage data in languages like SQL. Data definition
  language is the portion of the language dedicated to describing, creating, and
  modifying structures and the frameworks that will hold data.

#### Data independence
Data independence is a term used to describe the separation of database
  clients or applications from the underlying structure responsible for
  representing and storing the data. Data independence is achieved if the
  database is able to abstract the structure in a way that allows user
  applications to continue running even if additional attributes are added to a
  relation (logical independence) or if the details of the storage medium
  changes (physical independence), for instance.

#### Data mapper ORM
A data mapper ORM, or just simply a data mapper, is an application component
  that acts as a go between to translate between database representations and
  the data structures present in applications. Data mappers allow your
  application logic and database data representations to remain independent. The
  data mapper manages and translates data between these two mediums so that each
  representation is independent and can be structured intelligently.

#### Data type
A data type is a category or attribute that expresses a constraint on valid
  values. For example, an integer type specifies that only whole numbers are
  appropriate and expected for a variable or field. Data types allow you to
  specify expectations and requirements about your data when defining a
  field or container. The programming language or application can then validate
  that the introduced data meets the necessary criteria. Data types also help
  determine the available operations that can be performed on a piece of data.

#### Database
A database is a structure used to organize, structure, and store data.
  Databases are often managed by a database management system which provides an
  interface to manipulate and interact with the database and the data it
  manages. Databases can be highly structured or allow more flexible data
  storage patterns and can store many different types of data in a way that
  allows for querying, recalling, and combining data at the time of retrieval.

#### Database abstraction layer
A database abstraction layer is a programming interface that attempts to
  abstract differences between underlying database technologies to provide a
  unified experience or interface to the application layer. Database abstraction
  layers are often helpful for developers because they help to normalize the
  implementation differences between various offerings and can stay stable even
  as the underlying technology evolves. However, there are some challenges as
  well, such as leaking abstractions, masking implementation-specific features
  or optimizations from the user, and creating a dependency that can be
  difficult to dislodge.

#### Database administrator (DBA)
A database administrator, or DBA, is a role responsible for configuring,
  managing, and optimizing database systems and the related ecosystem of
  software and hardware. Some responsibilities they may be involved with include
  architecture planning, configuration, schema and change management,
  migrations, replication and load balancing, sharding, security considerations,
  managing backup strategies, and more. Database administrators are typically
  expected to have expertise in database design and theory and be able to help
  organizations make decisions about database technology selection and
  implementation. In many modern organizations, the responsibilities
  traditionally held by DBAs are now distributed between various members of the
  development and operations teams or have been offloaded to external providers
  to simplify some of the infrastructure management portions of the job.

#### Database engine
A database engine is the piece of a database management system responsible for
  defining how data is stored and retrieved, as well as the actions supported
  for interacting with the system and data. Some database management systems
  support multiple database engines that offer different features and designs,
  while other systems only support a single database engine that has been
  designed to align with the goals of the software.

#### Database management system (DBMS)
A database management system, often called a DBMS or even just a "database",
  is an application responsible for organizing and managing data. DBMSs can
  follow many different paradigms and prioritize certain goals. Generally, at
  the very least, they are responsible for persisting data, organizing and
  categorizing data, and ingesting, manipulating, and querying data. Most often,
  DBMSs offer a client / server model where the server is responsible for
  controlling and managing the data while clients, libraries, or APIs can be
  used to interact with the server to add or query data, change data structures,
  or manage other aspects of the system.

#### Database model
A database model is the overall strategy used by a database management system
  for storing, organizing, and providing access to data. There are many
  different database models available, but the relational model, which uses
  highly structured tables to store data in a specific format, is perhaps the
  most common type. Other types of databases include document databases,
  wide-column databases, hierarchical databases, key-value stores, and more.
  Some database systems are designed to be "multi-model", meaning they support
  databases with different types of models running within the same system.

#### Database proxy
A database proxy is a software component responsible for managing connections
  between database clients and database servers. Database proxies are used for a
  number of reasons including organizing access to a limited number of
  connections, allowing transparent scaling of the database layer, and
  redirecting traffic for deployments and similar scenarios. Database proxies
  are usually designed to be transparent for applications, meaning that the
  applications can connect to the proxy as if they were connecting directly to
  the backend database.

#### Dataset
A dataset, sometimes spelled data set, is a single collection of data.
  Typically, this represents a chunk of related data applicable to a certain
  task, application, or area of concern. Typically, datasets are a combination
  of the data itself as well as the structure and context necessary to interpret
  it. They often consist of a combination of quantitative and qualitative values
  that can act as the raw data for further analysis and interpretation.

#### Denormalization
Denormalization is a process where the data and structure within a database is
  "denormalized" or taken out of a normalized state. This can happen
  accidentally if a data structure that is intended to be normalized is ill
  defined or mismanaged. However, it is often also performed intentionally in
  certain scenarios. Denormalization tends to allow faster access to data by
  storing values redundantly in different places. The drawback of this is that
  write performance suffers and there is a possibility that data can get out of
  sync since multiple locations are used to represent the same data.

#### Dirty read
A dirty read is a specific type of anomaly that can occur where one
  transaction can read data that hasn't been committed by another transaction.
  If the second transaction is rolled back instead of committed, the first
  transaction will be using a value that doesn't reflect the actual state of the
  database. Dirty reads are possible at certain isolation levels for
  transactions and represent a risk that can lead to inconsistency when
  manipulating data in parallel.

#### Distributed database
A distributed database is a database system that spans multiple physical
  systems. Data is spread across a number of machines for the sake of
  performance or availability. While distributed systems can help scale a
  database to handle more load, they also represent a significant increase in
  complexity that can lead to consistency and partition challenges as well as
  certain negative performance impacts like an increase in data writes in some
  cases.

#### Document
In the context of document databases, a document is considered a container for
  information representing a single record or object containing related
  descriptive data. Documents can have a flexible structure that does not have
  to match the other documents on the system and can often be nested. Documents
  are typically represented in a data serialization format like JSON or YAML
  that can organize the document with labels and metadata.

#### Document database
A document database is a database model that represents items in individual
  objects called documents. While documents can be grouped together for
  organization, they don't have to share the same structure and can be designed
  to uniquely capture the data required to describe the item in question.
  Document databases typically don't support robust join operations to link
  different documents together, but are often praised for their flexibility and
  quick time-to-productivity due to their flexibility and ease in representing
  programmatic data structures.

#### Durability
Durability is a quality of data that signifies that it has been captured on
  persistent storage that will survive in the event of a program crash.
  Typically, this means flushing the data to a non-volatile storage medium like
  a hard drive that doesn't require electricity to maintain state.

#### Encoding
Encoding is a system that translates between a character system that can
  represents the components used in written language and a digital
  representation that the computer can store and operate on. Different encoding
  systems have been developed with a wide variety of character ranges. Some are
  targeted at specific languages or language families (like ASCII) while others
  attempt to provide representation for much larger character sets appropriate
  for many different languages (like the unicode UTF varieties).

#### Encrypted transport
Encrypted transport is any type of communication process that encrypts its
  messages prior to sending them to the recipient. Transport encryption is
  necessary to ensure privacy (prevent others from seeing sensitive information)
  as well as avoid tampering (making manipulation of the data obvious). Many
  different encrypted transport systems can be used when deploying databases,
  including TLS/SSL encryption, VPNs, and private networks.

#### Ephemerality
Ephemerality is a characteristic that indicates that a piece of data or
  circumstance is not permanent. In many ways, it is the opposite of durability.
  In databases, certain items, like data you wish to persist, should not be
  ephemeral. However, other components, like a secret key used to encrypt a
  connection between a database and client, can benefit from being ephemeral by
  preventing key leakage from affecting future or past sessions.

#### Ephemeral storage
Ephemeral storage, also sometimes called volatile or non-durable storage, is
  any storage medium that persists for a short time, often associated with
  certain conditions. For instance, in applications, data being stored in memory
  will only survive while the process is running. Similarly, data stored to a
  temporary directory is only available until the system reboots. Often,
  ephemeral storage is useful for temporary data or as a holding area before
  data can be stored on a more permanent medium.

#### Eventual consistency
Eventual consistency is a description of a consistency / availability strategy
  implemented by certain distributed computing or database systems. The CAP
  theorem of distributed systems states that systems must choose whether
  prioritize availability or data consistency in the face of a network
  partition. Eventual consistent systems make the choice to favor availability
  by continuing to serve requests even if the server's peers are not available
  to confirm operations. Eventually, when the partition is resolved, a
  consistency routine will run to decide on the most correct state of any
  inconsistent data, but there will be a time where the data on different
  servers are not in agreement.

#### Eviction
In the context of caches, eviction is a process where a piece of data is
  removed from a cache. This can happen because the current value has been
  invalidated by an operation or it can occur automatically as a result of
  policies designed to remove the data that is the oldest or least used.

#### Expand and contract pattern
The expand and contract pattern is a strategy for introducing new changes to a
  database schema without affecting existing applications. It works by
  introducing changes in carefully controlled stages by first adding new or
  changed structures alongside existing structures and then expanding the
  application logic to use both structures simultaneously. Eventually, after
  testing, the application can stop writing to the original structure and it can be
  removed.

#### Extract-transform-load (ETL)
Extract, transform, and load, often abbreviated as ETL, is a process of
  copying and processing data from a data source to a managed system. First the
  data is extracted from its current system to make it accessible to the
  destination system. Next, the data is manipulated and modified to match the
  requirements and format of the new system. Finally, the reconstructed data is
  loaded into the new system.

#### Feature flags
A feature flag, or a feature toggle, is a programming strategy that involves
  gating functionality behind an external switch or control. The switch is
  typically first set to indicate that the feature should not be active. When
  the organization is ready, they can activate the switch and the program will
  start using its new functionality. This allows new features to be deployed
  without immediately activating them. It decouples the deployment of new
  software from the release of the software, offering greater control over how a
  change is introduced and for greater testing in a production environment.

#### Field
A database column, or field, is a container for a specific type of data in a
  database table. Database fields in relational databases are regular, in the
  sense that each row in the table will contain the same number of fields with
  the same characteristics. The values that database fields can contain can be
  controlled by the data type assigned to the field as well as constraints that
  further limit the valid values.

#### Flat-file database
A flat-file database is a database or database-like structure stored in a
  file. These define the structure and the data the database contains in a
  unified format. Many examples of flat-file databases, like CSV
  (comma-separated values) files are written in plain text, but binary formats
  exist too. One difference between flat-file databases and more complex types
  is that the storage format itself often is responsible for describing the
  relationships between data instead of the database system.

#### Foreign key
A foreign key is a designated column or group of columns in a relational
  database that is used to maintain data integrity between two tables. A foreign
  key in one table refers to a candidate key, typically the primary key, in
  another table. Since a candidate key is referenced, each row in the database
  will be unique and the two tables can be linked together row for row. The
  values are of these designated columns is expected to remain identical across
  the two tables. The foreign key constraint allows the database system to
  enforce this requirement by not allowing the values to be out of sync.

#### Full-text search
Full-text search describes a family of techniques and functionality that allow
  you to search the complete text of documents within a database system. This is
  in direct opposition to search functionality that relies only on metadata,
  partial text sources, and other incomplete assessments. Full-text search
  relies on asynchronous indexing using natural language-aware parsers to
  analyze and categorize text within documents.

#### Graph database
A graph database is a NoSQL database that uses a graph structure to store and
  define relationships between pieces of data. Graph databases are constructed
  using nodes, which represent entities and can contain properties or
  attributes. Nodes are connected to one another using edges, which are
  responsible not only for linking nodes, but also defining the nature of the
  relationship. For example, a node might describe a person with a property of
  "teacher". It might be connected to a class node with an edge that
  specifies "teaches" but may be connected to another person node with an edge
  that specifies "married to".

#### GraphQL
GraphQL is a language that can be used to query and manipulate data, commonly
  used for building APIs. Clients are able to specify the exact data required
  and the server crafts a response following the provided structure. GraphQL's
  strengths are its ability to return data using custom structures, stitch
  together data from various back ends, and answer complex queries in a single
  API call.

#### HTAP database
HTAP databases, or hybrid transactional/analytical databases, are a category
  of database that seeks to offer the advantages of both fast, reliable
  transactional processing and the ability to process heavy, complex analytical
  workloads concurrently on the same machine. Rather than analyzing data after
  the fact, these database offerings attempt to allow real time analysis that
  can impact the way decisions are made rapidly.

#### Hierarchical database
A hierarchical database is a database model that organizes itself into a
  tree-like structure. Each new record is attached to a single parent record. As
  records are added to the database, a tree-like structure emerges as records
  fan out more and more from the root record. The links between records can be
  traversed to get to other records. Examples of systems that use a hierarchical
  model include LDAP (Lightweight Directory Access Protocol) and DNS (Domain
  Name System).

#### Horizontal scaling
Horizontal scaling, also known as scaling out, is a scaling strategy that
  involves increasing the number of units that can perform a given task. This
  often means increasing the number of computers in a worker pool that can
  respond to requests. Scaling out has many advantages including cost,
  flexibility, and the level of traffic that can be handled, but may add
  complexity in terms of coordination and consistency, especially when data is
  involved.

#### Hot backup
A hot backup is a backup of a database system while it is actively in use.
  They are often preferable, if possible, because they do not require the
  database system to be taken offline to perform the operation. Hot backups are
  not always possible as they can require locking certain parts of the database
  or can reduce the IOPS (Input / Output Operations per Second) available for
  normal database tasks.

#### In-memory database
An in-memory database is a database system where the entire data set can all
  be loaded into and processed in the computer's memory. This processing model
  offers huge performance benefits as all of the data is already in main memory
  and there is no delay retrieving data from slower storage. Care must be taken
  when using in-memory databases to have a strategy for persisting the data or
  repopulating the in-memory information when the machines are restarted.

#### Index
A database index is a structure that is created to allow for faster record
  finding within a table. An index allows the database system to look up data
  efficiently by keeping a separate structure for the values of specific
  columns. Queries that target the indexed columns can identify applicable rows
  in the table quickly by using a more efficient lookup strategy than checking
  each row line by line. Indexed columns improve read operations but do add
  overhead to write operations since both the table and the index must be
  updated. It is important to balance these two considerations when designing
  table indexes.

#### Ingesting
Ingesting data is the act of importing new data into a data system. This can
  be a one-off data loading operation or a continuous consumption of data being
  generated by other systems. Data ingestion is a common stage of populating and
  updating analytic databases and big data stores as they often involve
  consolidating data from various sources.

#### Inner join
An inner join is a type of relational database operation that joins two tables
  by only returning rows where the joining column values exist in both tables.
  With an inner join, there must be a match on the join columns in both tables.
  There are no rows using `NULL` values to pad out rows missing from one table
  or the other.

#### Interactive transactions
Interactive transactions are a database transaction feature that allows
  clients to manually specify transaction operations in an ad-hoc manner. Rather
  than a transaction being a wrapper around a group of queries that can all be
  executed sequentially with no pause, interactive transactions allow developers
  to briefly pause their database operations to execute other logic before
  continuing with the transaction processing. This gives flexibility in
  transaction processing but can lead to unwanted transaction running times if
  not carefully managed.

#### Isolation
In the context of databases, isolation is a property that describes how data
  and operations are visible within and between transactions. The level of
  isolation can be set by the database administrator or the query author to
  define the trade-offs between isolation levels and performance. Isolation is
  one of the key guarantees described by the ACID acronym.

#### Isolation levels
Isolation levels describe different types of trade-offs between isolation and
  performance that databases can make when processing transactions. Isolation
  levels determine what types of data leaking can occur between transactions or
  what data anomalies can occur. In general, greater levels of isolation provide
  more guarantees at the expense of slower processing.

#### Join
In relational databases, a join is an operation that connects two tables based
  on a shared "join" column or columns. The values within the join columns must
  be unique within each table. The join operation matches rows based on the join
  column values to create an extended virtual row composed of the columns from
  each table. Different types of joins are available based on what the user
  wants to do with rows that do not have a matching counterpart in the other
  table.

#### Key
In the context of databases, a key is any attribute, column, or group of
  attributes or columns that can be used to uniquely identify individual rows.
  Some pieces of data can be used as a key because of their natural uniqueness
  (a natural key) while other data sets may need to generate a key to identify
  each record (a surrogate key). Each table or data collection can have multiple
  keys that uniquely identify a row (called candidate keys), but typically,
  there is a main key (called the primary key) designated as the main way to
  access rows.

#### Key-value database
A key-value database, or key-value store, is a database model that allows
  users to store and retrieve data with an arbitrary structure using keys. The
  key is used to identify and access the record, which can consist of a single
  value or a structure of more complex data. Each record in a key-value database
  can define its own structure, so there is not a unified table structure as
  there is in relational databases. Key-value databases are useful because they
  are extremely flexible and use a model that feels familiar to many
  object-oriented developers.

#### Left join
A left join is a join operation for relational databases where all of the rows
  of the first table specified are returned, regardless of whether a matching
  row in the second table is found. Join operations construct virtual rows by
  matching records that have identical values in specified comparison columns
  from each table. The results for a left join will contain the rows from both
  tables where the column values matched and will additionally contain all of
  the unmatched rows from the first, or left, table. For these rows, the columns
  associated with the second, or right, table will be padded with `NULL` values
  to indicate that no matching row was found.

#### Lexeme
Lexemes are language-level units of meaning that are relevant in natural
  language processing and full-text search contexts. Typically, when text is
  indexed, it is broken down into individual tokens which are then analyzed as
  lexemes using language-level resources like dictionaries, thesauruses, and
  other word lists to understand how to process them further.

#### Locale
In databases and computing in general, a locale specifies the region,
  language, country, and other pieces of contextual data that should be used
  when performing operations and rendering results. In databases, locale
  settings can affect things like column orderings, comparisons between values,
  spelling, currency identifiers, date and time formatting, and more. Defining
  the correct locale at the database server level or requesting the locale you
  need during a database session are essential for ensuring that the operations
  are performed will yield the expected results.

#### Lock
In databases, a lock is a technique used to prevent modification of a database
  record or table in order to maintain consistency during certain operations.
  Locks can prevent any access to the locked resource or prevent only certain
  operations from being performed. They can be issued for a specific record or
  for an entire table. Because locks prevent concurrent operations from
  accessing the locked data, it is possible for locked data to impact
  performance and lead to resource contention.

#### MariaDB
MariaDB is an open-source relational database system developed with the goal
  of providing a drop-in replacement for MySQL after Oracle's acquisition left
  some within the community uncertain about the future direction of the project.
  Since its initial fork, each project has added features that widen the gap
  between the two database systems.

#### Microservice architecture
The microservices architecture is an application and service design that
  affects the development, deployment, and operation of the components. The
  microservices approach decomposes an application's functionality and
  implements each responsibility as a discrete service. Rather than internal
  function calls, the service communicates over the network using clearly
  defined interfaces. Microservices are often used to help speed up development
  as each component can be coded and iterated on independently. It also helps
  with scalability as each service can be scaled as needed, often with the help
  of service orchestration software.

#### Migration (database, schema)
Database or schema migrations are processes used to transform a database
  structure to a new design. This involves operations to modify the existing
  schema of a database or table as well as transforming any existing data to fit
  the new structure. Database migrations are often built upon one another and
  stored as an ordered list in version control so that the current database
  structure can be built from any previous version by sequentially applying the
  migration files. Often, developers must make decisions about how best to
  modify existing data to fit the new structure which might include columns that
  did not previously exist or changes to data that are difficult to easily
  reverse.

#### MongoDB
MongoDB is the most popular document-oriented NoSQL database system in use
  today. It stores data using JSON-like structures that can be specified at the
  time of data storage. Each document can have its own structure with as much or
  as little complexity as required. MongoDB provides non-SQL methods and
  commands to manage and query data programmatically or interactively. MongoDB
  is known for its fast performance, scalability, and for enabling a rapid
  development pace.

#### Monolithic architecture
Monolithic architecture is a term used to refer to a traditional application.
  In monoliths, although different pieces may be broken down internally for ease
  of development, once built, the application is a single item that has many
  different functions and responsibilities. Monoliths can interface with the
  external world in any number of ways, but the communication and coordination
  of different functionality within the program happens internally. Monolithic
  architecture is sometimes considered to be easier to implement, but does
  suffer from inflexibility with scaling and availability as the entire
  application must be scaled up and down as a single unit.

#### Multiversion concurrency control (MVCC)
Multiversion concurrency control, or MVCC, is a strategy for allowing
  concurrent access to data within database systems as an alternative to row and
  table locking. MVCC works by taking "snapshots" that represent a consistent
  data state for each user accessing a set of data. The goal of MVCC is to offer
  a system where read queries never block write queries and where write queries
  never block read queries. Each client will be able to read and use the data as
  if they were the only user while the database system tracks multiple versions
  of the data being read and updated by each user. Locking or the normal
  transaction rollback and conflict management strategies are used to resolve
  disputes caused by updating the same data.

#### MySQL
MySQL is one of the most popular relational database systems available today.
  Initially released in 1995 and acquired by Oracle in 2010, MySQL has a long
  history as powerful and easy to use relational system. It offers a wide array
  of storage engines and boasts very wide community support. It is used in many
  popular open-source and commercial projects and for many years was considered
  a key piece of software for many internet services.

#### Neo4j
Neo4j is a high performance graph-oriented database system. It offers
  ACID-compliant transactions with a graph data structure and uses the Cypher
  querying language to manage and query stored data. Neo4j allows developers to
  scale graph-oriented data workloads easily and offers clients in many
  different languages.

#### Network database
A network database is an early database model that conceived of data objects
  that could have more complex relationships than that of hierarchical
  databases. Instead of limiting a node's relationships to a single parent and
  zero or more children, a network database allowed you to represent nodes with
  multiple parents. This allowed you to represent more complex structures, but
  generally, the model was superseded by the introduction of relational
  databases.

#### NewSQL
NewSQL is a descriptor for a category of more recent relational database
  offerings that attempt to bridge the gap between the structure and
  well-ordered guarantees of a relational database system and the high
  performance and scalability associated with NoSQL databases. While NewSQL is a
  fairly loose categorization, it is generally used to refer to databases that
  allow SQL or SQL-like querying, transaction guarantees, and flexible scaling
  and distributed processing.

#### NoSQL
NoSQL databases, also sometimes called non-relational or not only SQL
  databases, are a broad category that covers any type of database systems that
  deviates from the common relational database model. While non-relational
  databases have long been available, the category generally is used to refer to
  newer generations of databases using alternative models like key-value,
  document-oriented, graph-oriented, and column family stores. They generally
  are used to manage data that is not suited for the relational model with a
  heavy focus on flexibility and scalability.

#### Node
In databases, a node often refers to a single instance of a database. The term
  node is often used when talking about the infrastructure architecture of
  distributed databases where multiple servers may be involved in processing a
  request.

#### Nonrepeatable read
A nonrepeatable read is a type of unwanted consistency problem that can occur
  at certain transaction isolation levels. A nonrepeatable read occurs when
  repeated read operations within a transaction can return different data based
  on commits outside of the transaction. This breach of isolation is one
  of the types of behavior that some transaction isolation levels are designed
  to prevent.

#### Normalization
Database normalization is a process of structuring a database to remove data
  redundancy and eliminate opportunities for inconsistencies to be introduced.
  Normalization is often discussed in terms of "normal forms" where each form
  adds additional checks and guarantees over the previous forms. In practice,
  data normalization is often a trade-off between data integrity guarantees and
  performance, so structures often are not put into the highest level of
  normalization possible.

#### OLAP database
An OLAP database, or Online Analytic Processing database, is a database system
  primarily designed to be used for analytics and insight generation. Databases
  used for OLAP do not require the same type of performance characteristics as
  those involved in real-time transaction processing (OLTP databases). Instead,
  they usually are designed for ingesting and working on large data sets,
  executing complex and long-running queries, and generating reports, graphs,
  and insights to help make business decisions.

#### OLTP database
An OLTP database, or Online Transaction Processing database, is a database
  system primarily designed to facilitate fast, near real time database tasks.
  Typically, OLTP databases are used with applications where multiple clients
  may be accessing the data at a single time and where quick response times are
  required. OLTP databases are optimized for reliability and processing speed.

#### ORM
An ORM, or Object Relational Mapper, is a database tool designed to translate
  between the relational model used by many databases and the object-oriented
  data model used in client applications. The tool offers a way represent
  database objects in code and to transform programming objects into a format
  appropriate for storing in a database. While ORMs can be helpful tools, they
  are usually not a perfect abstraction and can lead to issues where the
  different models conflict on how to represent data.

#### Object relational impedance mismatch
Object relational impedance mismatch is a term used for the general tension
  that exists between the relational model of data used by many databases and
  the object-oriented view of data used in many applications. The impedance
  mismatch refers to the differences between the two models that makes faithful
  translation between the representations difficult or impossible. It is a broad
  term used to refer to many different types of problems that can occur within
  the space including problems representing inheritance, encapsulation, type
  differences, different consistency guarantees, and more.

#### Optimistic concurrency control (OCC)
Optimistic concurrency control, sometimes referred to as OCC, is a strategy
  used by database systems to handle conflicting concurrent operations.
  Optimistic concurrency control assumes that concurrent transactions will
  likely not interfere with each other and allows them to proceed. If a conflict
  occurs when a transaction attempts to commit, it will be rolled back at that
  time. OCC is an attractive policy if you think that most transactions within
  your workloads will not be in conflict with one another. Only transactions
  that do in fact have a conflict will suffer a performance penalty (they'll be
  rolled back and will have to be restarted) while all non-conflicting
  transactions can execute without waiting to see if a conflict will arise.

#### Outer join
An outer join is a type of relational database operation that joins two tables
  by returning all rows from each component table, even where there is not a
  matching record in the companion table. Join operations construct virtual rows
  by matching records that have identical values in specified comparison columns
  from each table. The results for an outer join will contain the rows from both
  tables where the column values matched and will additionally contain all of
  the unmatched rows from each table. For these rows, the columns without a
  match in the other table will be padded with `NULL` values to indicate that no
  matching row was found.

#### Parameterized query
A parameterized query, also known as a prepared statement, is a database query
  that has been prepared to take user input as parameters instead of by concatenating
  strings with user input. Parameterized queries allow you to specify the query,
  including the unknown inputs ahead of time and then later provide the values
  that should be substituted within the statement. This prevents SQL injection
  vulnerabilities where carefully crafted inputs can be used to make the
  database system misinterpret a query by viewing values as executable SQL code.

#### Persistence
Persistence is a quality of data that indicates that the state will outlive
  the process that created it. Persistence is a key part of most database
  systems and allows the data to be loaded once again after the database process
  or the server itself is restarted. Applications and databases can have various
  levels of persistence that guard against different types of failure conditions
  like single system persistence, remote persistence, and cluster persistence.

#### Persistent storage
Persistent storage refers to any storage medium that is able to maintain data
  after the system loses power or is disconnected. Persistent storage is
  required to maintain a more permanent repository of data. Often, persistent
  storage is slower than ephemeral storage like in-memory data, so database
  systems use a variety of processes to shuttle data between the two storage
  systems as needed to take advantage of and balance the disadvantages of both
  types.

#### Pessimistic concurrency control (PCC)
Pessimistic concurrency control, or PCC, is a strategy used by database
  systems to handle conflicting concurrent operations. In contrast to optimistic
  concurrency control, pessimistic concurrency control short circuits
  transactions as soon as the possibility of a conflict arises. This strategy is
  useful if frequent conflicts occur because it ensures that the system does not
  waste time executing transactions that will be unable to commit due to
  conflict. Instead, it enforces a more serialized execution approach when
  conflicts might occur, which is slower, but avoids non-productive processing.

#### Phantom read
A phantom read is a type of isolation anomaly that can occur within a
  transaction under certain types of isolation levels. A phantom read occurs
  when different rows are returned for a `SELECT` operation during a transaction
  due to changes made outside of the transaction. For example if you try to
  `SELECT` all records in a table, the first time it could return 8 rows, but if
  another transaction commits an additional row, a repeat of the original query
  would show a different result.

#### PostgreSQL
PostgreSQL is a popular, high performance relational database system known for
  its compliance to various SQL standards. PostgreSQL focuses on providing a
  single, flexible database engine instead of offering multiple engines for
  different use cases. It is highly extensible and has a great range of
  community additions and client applications.

#### Precision (searching)
In the context of search performance, precision is a measure of how relevant
  the retrieved results are to the given query. Specifically, search precision
  is defined as the ratio between the number of relevant results out of all of
  the results that were returned. A query with a high level of precision does
  not retrieve many items that are not applicable to the query.

#### Primary key
A primary key is a type of database key that is designated as the main way to
  uniquely address a database row. While other keys may be able to pull
  individual rows, the primary key is specifically marked for this purpose with
  the system enforcing uniqueness and not `NULL` consistency checks. A primary
  key can be a natural key (a key that is naturally unique across records) or a
  surrogate key (a key added specifically to serve as a primary key) and can be
  formed from a single or multiple columns.

#### Query
In databases, a query is a formatted command used to make a request to a
  database management system using a query language. The database system
  processes the query to understand what actions to take and what data to return
  to the client. Often, queries are used to request data matching specific
  patterns, insert new data into an existing structure, or modify and save
  changes to existing records. In addition to targeting data items, queries can
  often manipulate items like table structures and the server settings, making
  them the general administrative interface for the system. SQL, or Structured
  Query Language, is the most common database querying language used with
  relational databases.

#### Query builder
A query builder is a database abstraction used in application development to
  make programming against databases easier. Similar to an ORM, a query builder
  provides an interface for working with a database system from within the
  application. However, instead of attempting to map application objects to
  database records directly, query builders focus on providing native functions
  and methods that translate closely to the database operations. This allows you
  to build queries programmatically in a safer and more flexible way than
  working with SQL (or other database language) strings directly.

#### Query language
A query language is a type of programming language that specializes in
  searching for, retrieving, and manipulating data in databases. SQL, or
  Structured Query Language, is the most common querying language in the world
  and is used primarily to manage data within relational database systems. Query
  language operations can be categorized based on the focus and target of the
  procedure into Data Definition Language (DDL) when they are used to define
  data structures, Data Control Language (DCL) when they are used for system
  management tasks, and Data Manipulation Language (DML) when they are used to
  modify data.

#### Query planner
A query planner is an internal component of a database system that is
  responsible for translating a client provided query into steps that can be
  used to actually search the database and construct the desired response. Well
  designed query planners can consider multiple potential solutions and select
  the option that will give the most optimized results. Sometimes, query
  planners do not select the best solution and database administrators must
  tweak the selection criteria manually.

#### Raft consensus algorithm
The Raft consensus algorithm is an algorithm designed to coordinate
  information sharing, management responsibilities, and fault recovery across a
  cluster of nodes. The algorithm provides a method to ensure that each member
  agrees on data operations and includes mechanisms for leader election in cases
  of network partitions or node outages. It is generally considered a simpler
  algorithm to implement than alternatives like{' '}
  <a href="https://en.wikipedia.org/wiki/Paxos_(computer_science)">Paxos</a>.

#### Read committed isolation level
The read committed isolation level is a transaction isolation level for
  relational database systems that offers a minimal amount of isolation
  guarantees. At the read committed level, transactions are guaranteed to be
  free of dirty reads, a phenomena where transactions can read data from other
  transactions that have not been committed yet. Nonrepeatable reads, phantom
  reads, and serialization anomalies are still possible at this isolation level.

#### Read operation
A read operation is generally defined as any operation that retrieves data
  without modification. Read operations should generally behave as if the
  underlying data were immutable. They may modify the retrieved data to change
  its format, filter it, or make other modifications, but the underlying data
  stored in the database system is not changed.

#### Read-through caching
Read-through caching is a caching strategy where the cache is deployed in the
  path to the backing data source. The application sends all read queries
  directly to the cache. If the cache contains the requested item, it is
  returned immediately. If the cache request misses, the cache fetches the data
  from the backing database in order to return the items to the client and add
  it to the cache for future queries. In this architecture, the application
  continues to send all write queries directly to  the backing database.

#### Read uncommitted isolation level
The read uncommitted isolation level is a transaction isolation level for
  relational database systems that fundamentally offers no isolation.
  Transactions performed using the read uncommitted isolation level can suffer
  from dirty reads, nonrepeatable reads, phantom reads, and serialization
  anomalies. Generally speaking, the read uncommitted level is not very useful
  as it does not fulfill most users' expectations for isolation.

#### Recall
In the context of search performance, recall is a measure of how many of the
  relevant items a query was able to retrieve. Recall is specifically defined as
  the ratio of the number of relevant results returned by a query compared to
  the total number of relevant entries in the dataset. A query with high recall
  retrieves a large number of the items that would be potentially relevant to a
  search query.

#### Record
In databases, a record is a group of data usually representing a single
  entity. In relational databases, a record is synonymous with a row in a table.
  Each record may have multiple pieces of data or attributes associated with it
  (these would be fields in a relational table).

#### Redis
Redis is a popular high performance key-value store that is frequently
  deployed as a cache, message queue, or configuration store. Redis is primarily
  an in-memory database but can optionally persist data to nonvolatile storage.
  It features a wide variety of types, flexible deployment options, and high
  scalability.

#### Relational database
A relational database is a database model that organizes data items according
  to predefined data structures known as tables. A table defines various columns
  with specific constraints and types and each record is added as a row in the
  table. The use of highly regular data structures provides relational database
  systems with many ways to combine the data held within various tables to
  answer individual queries. Relational databases take their name from algebraic
  relations which describe different operations that can be used to manipulate
  regular data. In most cases, relational databases use the SQL (Structured
  Query Language) to interact with the database system as it allows users to
  express complex queries in an ad-hoc manner.

#### Relational database management system (RDBMS)
A relational database management system, also known as an RDBMS, is database
  software that manages relational databases. In practice, the term RDBMS is
  often used interchangeably with relational database, though technically
  speaking, an RDBMS manages one or more relational databases.

#### Repeatable read isolation level
The repeatable read isolation level is a transaction isolation level for
  relational database systems that offers better isolation than read committed
  level, but not as much isolation of the serializable level. At the repeatable
  read isolation level, dirty reads and nonrepeatable reads are both prevented.
  However, phantom reads and serialization anomalies can still occur. This means
  that while reads of individual records are guaranteed to remain stable, range
  queries (like `SELECT` statements that return multiple rows) can change as a
  result of commits outside of the transaction.

#### Replication
Replication is a process of continually copying and updating data from one
  system to another system. In databases, this typically involves a server
  sharing a log of changes that other servers can read and apply to their own
  copies of the data. This allows changes to propagate between various servers
  without requiring each server to approve operations at the time of execution.
  Many types of replication exists that differ in terms of method of sharing,
  the architecture of which systems copy data from where, and what policies are
  in place to control the replication process. Replication is an important
  feature in many systems for maintaining data availability, distributing load,
  and providing copies of data for offline procedures like backups.

#### Right join
A right join is a join operation for relational databases where all of the
  rows of the second table specified are returned, regardless of whether a
  matching row in the first table is found. Join operations construct virtual
  rows by matching records that have identical values in specified comparison
  columns from each table. The results for a right join will contain the rows
  from both tables where the column values matched and will additionally contain
  all of the unmatched rows from the second, or right, table. For these rows,
  the columns associated with the first, or left, table will be padded with
  `NULL` values  to indicate that no matching row was found.

#### Role-based access control (RBAC)
Role-based access control, also known as RBAC, is a security strategy that
  restricts the operations permitted to a user based on their assigned roles.
  Permissions on object and privileges to execute actions are assigned to roles,
  labels that make managing access easier. To grant the capabilities associated
  with a role to a user, the user can be made a member of the role. Users can be
  made a member of multiple roles to gain a union of the permissions each role
  provides. Roles are helpful as a way of standardizing the privileges required
  for various roles and making it simple to add or remove access to users.

#### Row
In relational databases, a row is a representation of a single record within a
  database table. Rows in these databases have a predefined structure in the
  form of a collection of columns that specify the data type and any constraints
  on the range of acceptable values. Each row in a relational table has the same
  columns or fields, leading to a very regular data structure.

#### Serial scanning
Serial scanning is a search technique that involves analyzing each potential
  item against the query at the time of the search. This is in opposition to
  index-based searching where items are accounted for and organized ahead of
  time to allow for faster query response.

#### SQL
SQL, or Structured Query Language, is the most common database querying
  language in use today. It is primarily used to work with relational data and
  allows users to create queries to select, filter, define, and manipulate the
  data within relational databases. While SQL is a common standard,
  implementation details differ widely, making it less software agnostic than
  hoped.

#### SQL injection
SQL injection is a type of attack that can be performed against vulnerable
  SQL-backed applications. It works by carefully crafting inputs that can be
  used to make the database system misinterpret a query by treating submitted
  values as executable SQL code. SQL injection is primarily caused by developers
  attempting to combine unsanitized user input with a query string using string
  concatenation. It can be prevented using prepared statements, also called
  parameterized queries, where the query with placeholders is submitted to the
  database separately from the substitute values so that the boundaries of the
  query values are unambiguous.

#### SQLite
SQLite is a relational database management system written as a C language
  library. Since it is implemented as a library, it does not conform to the
  traditional client / server separation model and instead relies on the library
  or client program to perform both roles to write to local files. It is
  extremely functional for its size and is especially suitable for embedded use.
  SQLite has bindings in many different languages and it is deployed widely in
  applications as an internal storage system.

#### Sanitizing input
Sanitizing input, also known as input validation, is a process used to render
  user-provided values safe for further processing. It is used to guard against
  malicious input that can cause an application or the database to misinterpret
  data values as valid application or query code. Inputs can be sanitized in a
  number of different ways like limiting the list of valid characters, removing
  characters that have special meaning for the systems in use, and escaping
  values. Generally speaking, instead of sanitizing input, it is considered much
  safer to use prepared statements.

#### Scaling
Scaling is the process of expanding the resources allocated to your
  application or workload to allow for better performance or to handle more
  concurrent activity. Scaling strategies generally fall into two categories:
  scaling out (also called horizontal scaling) and scaling up (also known as
  vertical scaling). Horizontal scaling involves adding additional workers to a
  pool that can handle the incoming work. This often means adding additional
  servers that can all perform the same operations, thus distributing the load.
  Scaling up involves adding additional resources like processors, RAM, or
  storage to the server already handling requests. Scaling allows you to handle
  more concurrent operations but it can potentially increase the complexity of
  your application architecture.

#### Schema
A database schema is a structure describing how data should be organized
  within a database system. It defines the format of each table, field, index,
  relation, function, and any other structures held within the database. The
  schema is the definition that tells the database system what the object looks
  like and what data is and is not allowed to be associated with the object. In
  PostgreSQL, the database schema has a slightly different connotation in that
  it is implemented as a child of a database object that acts as a namespace for
  other database objects.

#### Serializable isolation level
The serializable isolation level is a transaction isolation level for
  relational database systems that offers the strictest isolation guarantees. At
  the serializable level, dirty reads, nonrepeatable reads, phantom reads, and
  serialization anomalies are all prevented. The database system does this by
  aborting any transactions where conflicts may occur, which ensures that
  concurrent transactions can be applied as if they were serially applied.
  Serializable isolation provides strong isolation, but it can suffer from
  significant performance problems due to the fact that conflicting transactions
  may be aborted and have to be resubmitted.

#### Serialization anomaly
A serialization anomaly is a problem that can occur with concurrent
  transactions where the order that concurrent transactions are committed can
  impact the resulting data. Serialization anomalies occur because operations in
  different transactions can be making calculations based on data that other
  transactions may be updating. To prevent serialization anomalies, transactions
  must use the serializable isolation level, which prevents these conditions by
  rolling back one of the conflicting transactions.

#### Shard
A database shard is a segment of records stored by a database object that is
  separated out and managed by a different database node for performance
  reasons. For example, a database table with 9 million records could be divided
  into three separate shards, each managing 3 million records. The data is
  typically divided according to a "shard key" which is a key that determines
  which shard a record should be managed by. Each shard manages its subset of
  records and a coordinating component is required to direct client queries to
  the appropriate shard by referring to the shard key. Sharding can help some
  types of performance in very large datasets but it often requires making
  trade-offs that might degrade other types of performance (for instance, on
  operations that need to coordinate between multiple shards).

#### Stale data
When working with data storage, stale data refers to any data that does not
  accurately reflect the most recent state of the data. This is often a concern
  primarily when caching, as pieces of data might potentially be preserved and
  used long after they been invalidated by changes.

#### Standard column family
A standard column family is a type of column family database object that
  stores data by defining row keys that are associated with key value pairs akin
  to columns. Each row can define and use its own columns, so the resulting
  dataset is not regular as with relational database tables. However, the row
  keys combined with column labels and values still somewhat resembles a table.
  Standard column families offer good performance for key-based data retrieval
  as they are able to store all of the information associated with a key in the
  same place and can modify the data structure for that key easily.

#### Stemming
Stemming is a technique used in full-text search indexing where words with the
  same stem are collapsed into a single entry. This increases the number of
  relevant results considered at the expense of a slight decrease in precision.
  For instance, the words "cook", "cooked", and "cooks" might occupy a single
  entry where a search for any of the terms would return results for the whole
  entry.

#### Stop words
In full-text search contexts, stop words are a list of words that are
  considered inapplicable to search queries. These are typically the most common
  words in a language that lack much meaning on their own or are ambiguous to
  the point of irrelevancy. Some examples in English are words like "the", "it",
  and "a".

#### Storage engine
A storage engine is the underlying component in database management systems
  that is responsible for inserting, removing, querying, and updating data
  within the database. Many database features, like the ability to execute
  transactions, are actually properties of the underlying storage engine. Some
  database systems, like MySQL, have many different storage engines that can be
  used according to the requirements of your use case. Other systems, like
  PostgreSQL, focus on providing a single storage engine that is useful in all
  typical scenarios.

#### Stored procedure
A stored procedure is a way to define a set of operations within the database
  that clients can easily run. Because they are stored within the database, they
  can sometimes offer performance improvements and avoid network latency. Stored
  procedures differ from user defined functions in that they must be explicitly
  invoked with a special statement rather than incorporated into other queries
  and cannot be used in all of the same scenarios.

#### Super column family
A super column family is a type of column family database object that stores
  data by defining row keys that are associated with column families. Each row
  can contain multiple column families as a way of segmenting data further than
  in standard column families.

#### Superkey
A superkey is any set of attributes within the relational database model that
  can be used to uniquely identify a record. All other key types (primary keys,
  candidate keys, composite keys, etc.) are examples of super keys. A trivial
  superkey contains all available attributes, while a candidate key is any
  superkey that cannot be simplified by removing additional columns.

#### Table
In relational databases, a table is a database structure that defines
  different attributes in the form of columns and stores records with the
  associated column values in the form of rows. The constraints and data types
  defined by a table's columns as well as additional table-level requirements
  describe the type of data that can be stored within the table. Since tables
  are a regular data structure, the database system understands the shape of the
  data contained within, which can help make query performance more predictable
  in some cases.

#### Table aliases
A table alias is a name given at query time for an existing or calculated table
  or table-like database object. Table aliases can be useful if the original
  name is long or ambiguous or if the table is generated by the query itself and
  requires a label to refer back to it in other parts of the query or for
  display.

#### Three tier architecture
The three tier application architecture is a common infrastructure
  architecture for deploying web applications. The first layer is comprised of
  one or more web servers that respond to client requests, serve static content,
  and generate requests to the subsequent layers. The second layer is handled by
  application servers and is responsible for generating dynamic content by
  executing code to generate responses for the front end. The third layer is
  handled by the database system and is responsible for responding to requests
  from the middle layer for custom values used to generate content.

#### Token
In natural language processing and full-text search, a token is a discrete
  word that is recognized to the system and can be categorized according to
  different features. A token might be stored with information including its
  relative position in a piece of text, its type (number, word, phrase, etc.),
  as well as any additional metadata that might be useful.

#### Transaction
A database transaction is a set of operations combined into a single unit that
  can be executed by a database system atomically. Transactions ensure that all
  of the operations within them are successfully completed or that they are all
  rolled back to return to the starting state. This helps preserve data
  integrity and allows for isolation between different unrelated actions that
  clients may make within a database. The guarantees provided by database
  transactions are summarized by the ACID (atomicity, consistency, isolation,
  and durability) properties.

#### Two-phase commit
Two-phase commit is an algorithm used to implement transactions in distributed
  systems. Two-phase commits work by separating the commit process into two
  general stages. In the first stage, a potential change is communicated by the
  server that received it to a coordinating component. The coordinator requests
  a vote from all of the involved servers on whether to commit or not. If the
  vote succeeds, the second stage begins where the transaction is actually
  committed by each individual member. The algorithm allows distributed systems
  to maintain a consistent dataset at the expense of the overhead associated
  with coordinating the voting procedure.

#### Two-phase locking
Two-phase locking, sometimes abbreviated as 2PL, is a strategy for concurrency
  control to ensure that transactions are serializable. The two phases refer to
  actions that expand the number of locks held by the transaction and the
  actions that trigger a release of locks. Two phase locking works by using
  exclusive and shared locks to coordinate read and write operations. A
  transaction that needs to read data can request a shared read lock that allows
  other transactions to read the same data but blocks write operations. Because
  this is a shared lock, each successive read operation can simultaneously
  request a read lock and the data will remain unmodifiable until they are all
  released. A transaction that needs to modify data requests an exclusive write
  lock which prevents other write locks and any read locks from being issued.

#### Upsert
An upsert is a database operation that either updates an existing entry or
  inserts a new entry when no current entry is found. Upsert operations consists
  of a querying component that is used to search for matching records to update
  and a mutation component that specifies which values should be updated. Often,
  additional values need to be provided for other fields to handle the case
  where a new record must be created.

#### Value
When talking about databases, a value is any piece of data that the database
  system stores within its data structures. With additional context like the
  name of the field where the value is stored, meaning can be assigned to the
  value beyond what is intrinsically there. The specific storage structure like
  the column or table may define requirements about what types of values it
  stores.

#### Vertical scaling
Vertical scaling, also known as scaling up, is a scaling strategy that
  involves allocating additional resources like CPUs, RAM, or storage to a
  server or component in order to increase its performance or load capacity.
  Scaling up is typically the simplest strategy for scaling workloads as it does
  not increase the architectural complexity of the current deployment. While
  vertical scaling can work well in many scenarios, some disadvantages include
  reliance on a single point of failure and limitations on the amount of
  resources that can reasonably be managed by a single machine.

#### Vertices
In graph databases, vertices are entities that can hold properties and be
  connected to other vertices through edges. Vertices are similar to a record or
  a document in other database systems as they have a label or name to indicate
  the type of object they represent and they have attributes that provide
  specific additional information to differentiate a specific vertex from others
  of its type. Vertices are connected to other vertices through edges that
  define a relationship between them. For instance, an "author" vertex can be
  connected to a "book" vertex with a "written by" edge.

#### View
In relational databases, a view is a table-like representation of a stored
  query. Views can be used as tables in many contexts, but instead of being part
  of the underlying data structure, they are derived from the results of their
  query. Views are useful for constructing more complex representations of data
  than exists in the underlying schema. For example, a view might join a few
  tables and display only a few relevant columns, which can help make the data
  more useable even if a different structure is preferable for storage due to
  consistency or performance reasons.

#### Volatile storage
Volatile storage is any type of storage that is dependent on continual power
  to persist data. For example, data stored in RAM is typically considered to be
  volatile because it will be lost and unrecoverable in the event of a power
  outage.

#### Wide-column store
A wide-column store is a type of NoSQL database that organizes its data into
  rows and columns using standard and super column families. A row key is used
  to retrieve all of the associated columns and super columns. Each row can
  contain entirely different columns as the column definitions and values are
  stored within the row structure itself.

#### Write-ahead logging (WAL)
Write-ahead logging, or WAL, is an approach to data revision management that
  increases the resiliency of systems to data corruption during crashes and
  failures. Without a technique like WAL, corruption can occur if the system
  crashes when a change to a database is only partially completed. In this case,
  the data will be in neither the initial nor the intended state. With write-ahead logging, the system records its intentions to a durable write-ahead log
  before executing operations. This way, the database can recover a known-good
  state of the data by reviewing the log during recovery and redoing any
  operations that did not complete correctly initially.

#### Weight (search)
In the context of searching, a search weight is an arbitrary value assigned to
  different categories of data designed to influence the priority of the item
  when analyzed for relevance. Assigning a heavy weight to a specific type of
  information will cause a query engine to assign greater significance to that
  category compared to other categories when compiling a list of relevant
  results.

#### Write-around caching
Write-around caching is a caching pattern where write queries are sent to the
  backing database directly rather than written to the cache first. Because any
  items in the cache related to the update will be now be stale, this method
  requires a way to invalidate the cache results for those items for subsequent
  reads. This technique is almost always combined with a policy for cache reads
  to control read behavior. This approach is best for data that is read
  infrequently once written or updated.

#### Write-back caching
Write-back caching is a caching method where write queries are sent to the
  cache instead of the backing database. The cache then periodically bundles the
  write operations and sends them to the backing database for persistence. This
  is a modification of the write-through caching approach to reduce strain
  caused by high throughput write operations at the cost of less durability in
  the event of a crash. This ensures that all recently written data is
  immediately available to applications without additional operations, but can
  result in data loss if the cache crashes before it's able to persist writes to
  the database.

#### Write operation
In the context of databases, a write operation is any database action that
  modifies the stored data. This includes inserting new records, deleting
  records, and updating existing records to new values.

#### Write-through caching
Write-through caching is a caching pattern where the application writes
  changes directly to the cache instead of the backing database. The cache then
  immediately forwards the new data to the backing database for persistence.
  This strategy minimizes the risk of data loss in the event of a cache crash
  while ensuring that read operations have access to all new data. In high write
  scenarios, it may make sense to transition to write-back caching to prevent
  straining the backing database.
