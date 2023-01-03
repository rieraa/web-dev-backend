# 辅助学习系统 后端部分

## NodeJS 和 Express 数据库为 MySQL

## 服务器配置

1. 本地全局安装 nodemon `npm i nodemon -g` 即可

## 数据库配置（必看）

1. 下载好项目后，先改 db 文件下的 index.js 里的数据库连接
2. 然后本地创建好对应的数据库 study_system ，推荐使用 DateGrip 工具
3. 数据库目前只有 user 表，等待后续添加，添加后告诉他人自己的格式，方便别人开发

### 注意：

- 可能会出现连接报错 Client does not support authentication protocol requested by server; consider upgrading MySQL client
- 在管理 Mysql 的工具里新建查询，输入一下语句即可

```sql
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的MySQL密码';
FLUSH PRIVILEGES;
```

格式如下：SQL 语句（包含该表的 DDL 和当前的测试数据）

### 1.user 表

```sql
create table users
(
    username varchar(255) not null,
    password varchar(255) not null,
    account  char(11)     not null,
    id       int auto_increment
        primary key,
    user_pic text         null comment '头像',
    constraint users_account_uindex
        unique (account),
    constraint users_id_uindex
        unique (id)
);

INSERT INTO study_system.users (username, password, account, id, user_pic) VALUES ('hcx', '$2a$05$g1l3lA4HFZqoVYeMHoOGz.v8bxmptkH/7XPwzEAAv3bIhRKNE2QVm', '17387069447', 2, null);
```

### 2020/10/6 更新

1. 添加了新方法查询题目状态（根据 token 查询 id，进而查询该人物所有题目对应状态），并添加了对应路由且实现接口
2. 数据库新增三张表分别为 stu，problems，status 三张表，语句附在下方
3. 使用 postman 测试时，进入'/my'的接口需要附带 token 验证，可以先注册账号，不然找开发者要账号密码（有逻辑还不完善，建议要账号密码）。先通过登录获得 token 的值，获取 token 后访问'/my'接口需要在请求头附带 token，即 Header 部分，键值对为：Authorization，（你获得的 token 值）

stu 表及数据：

```sql
create table stu
(
    stu_id   int         not null
        primary key,
    stu_name varchar(20) not null,
    constraint stu_stu_id_uindex
        unique (stu_id)
);

INSERT INTO study_system.stu (stu_id, stu_name) VALUES (1, 'hz');
INSERT INTO study_system.stu (stu_id, stu_name) VALUES (2, 'hcx');

```

其中 id 为学生 id，name 为学生姓名

problems 表及数据：

```sql
create table problems
(
    pb_id      int           not null
        primary key,
    pb_content varchar(1000) null,
    pb_name    varchar(10)   null,
    constraint `problems_pb-id_uindex`
        unique (pb_id)
);

INSERT INTO study_system.problems (pb_id, pb_content, pb_name) VALUES (1, 'test problem', 'test name');
INSERT INTO study_system.problems (pb_id, pb_content, pb_name) VALUES (2, '测试问题', '测试名字');

```

其中 id 为问题题号，content 为题目详细内容，name 为题名

status 表及数据：

```sql
create table status
(
    stu_id      int           not null,
    pb_id       int           not null,
    statu       int default 0 not null,
    sub_time    time          null,
    sub_content varchar(1000) null,
    t_comment   varchar(200)  null
);

INSERT INTO study_system.status (stu_id, pb_id, statu, sub_time, sub_content, t_comment) VALUES (1, 1, 0, null, null, null);
INSERT INTO study_system.status (stu_id, pb_id, statu, sub_time, sub_content, t_comment) VALUES (1, 2, 1, null, null, null);
INSERT INTO study_system.status (stu_id, pb_id, statu, sub_time, sub_content, t_comment) VALUES (2, 1, 0, null, null, null);

```

其中 stu_id 为学生 id，pb_id 为题目 id，statu 为题目状态（暂定为 0,1,2)，sub_time 为提交时间，sub_content 为学生提交代码内容，t_comment 为老师评语

### 2022/10/7 更新

1. 修改了数据库的不规范命名，修改了数据库格式，新增数据（格式更新如下，数据单独上传了 sql 文件）
2. 查询题目单新增分页功能和条件查询功能，可以根据题目完成状态和是否必做来进行条件查询

```sql
rename table status to problemList;

alter table problemlist
    change statu pb_state int default 0 not null;



alter table problems
    add publish_time datetime null;

UPDATE study_system.problems t SET t.publish_time = '2011-10-07 11:17:54' WHERE t.pb_id = 2
UPDATE study_system.problems t SET t.publish_time = '2022-10-15 10:15:27' WHERE t.pb_id = 1



alter table problems
    modify is_demand boolean default true null;

UPDATE study_system.problems t SET t.is_demand = 1 WHERE t.pb_id = 1
UPDATE study_system.problems t SET t.is_demand = 1 WHERE t.pb_id = 2

```

### 2020/10/8 更新

problems 表需要添加主键，将 pb_id 设置为主键，语句为

```sql
alter table problems add primary key (pb_id);
```

创建 teacher 表，tea_id 为主键，添加外键约束

```sql
create table teacher(
    tea_id int primary key ,
    tea_name char(10) ,
    constraint FK_tea_id foreign key(tea_id) references users(id)
)
```

创建 class 班级表

```sql
create table class(
    class_id int primary key ,
    tea_id int not null ,
    constraint FK_class_teaid foreign key (tea_id) references teacher(tea_id)
)
```

创建 student 表

```sql
create table student(
    stu_id int primary key ,
    tea_id int not null ,
    class_id int not null,
    stu_name char(10) not null ,
    constraint FK_stu_stu_id foreign key (stu_id)references users(id),
    constraint FK_stu_tea_id foreign key (tea_id)references teacher(tea_id),
    constraint FK_stu_class_id foreign key (class_id)references class(class_id)
)
```

添加 status 表中主键和外键约束

```sql
 alter table status add primary key (stu_id,pb_id);
 alter table  status add constraint FK_status_pb_id foreign key(pb_id)references problems(pb_id);
 alter table  status add constraint FK_status_stu_id foreign key(stu_id)references student(stu_id);
```

### 数据库最新

create table problem
(
pid int auto_increment
primary key,
pbContent char(100) not null,
pbName char(20) not null,
createTime datetime not null
);

create table user
(
account char(11) not null
primary key,
password char(100) not null,
role char(10) not null
);

create table teacher
(
tid int auto_increment
primary key,
name char(5) not null,
account char(11) null,
constraint teacher_user_account_fk
foreign key (account) references user (account)
);

create table class
(
cid char(5) not null
primary key,
tid int null,
cname char(20) null,
constraint class_teacher_tid_fk
foreign key (tid) references teacher (tid)
);

create table problemlist
(
pid int auto_increment,
cid char(11) not null,
deliveryTime datetime not null,
endTime datetime not null,
mustdo int null,
primary key (pid, cid),
constraint problemlist_class_cid_fk
foreign key (cid) references class (cid),
constraint problemlist_problem_pid_fk
foreign key (pid) references problem (pid)
);

create table student
(
sid int auto_increment
primary key,
name char(5) not null,
cid char(5) null,
phonenum char(15) null,
nickname char(10) null,
gender char(2) null,
account char(11) null,
constraint student_class_cid_fk
foreign key (cid) references class (cid),
constraint student_user_account_fk
foreign key (account) references user (account)
);

create table recordlist
(
sid int not null,
pid int auto_increment,
startTime datetime not null,
endTime datetime null,
comment char(50) null,
state int null,
content varchar(255) default ' ' null,
score int null,
primary key (sid, pid),
constraint recordlist_problem_pid_fk
foreign key (pid) references problem (pid),
constraint recordlist_student_sid_fk
foreign key (sid) references student (sid)
);

alter table recordlist
modify pid int auto_increment;
