装饰器模式(Decorator Pattern) 允许向现有的对象添加新功能，便于运行时动态添加或修改对象，主要解决**避免通过继承引入静态特征，特别是子类数量膨胀情况下**。

### 关键代码：

- Component接口 ： 定义被装饰对象 (接口和抽象类)
- ConcreteComponent类 ： 实现接口的具体类
- Decorator抽象类：实现Component接口，包含接口的引用。
- ConcreteDecorator类：扩展Decorator类，扩展方法和功能

### 优点：

- **低耦合**：装饰类和被装饰类可以独立变化，互不影响。
- **灵活性**：可以动态地添加或撤销功能。
- **替代继承**：提供了一种继承之外的扩展对象功能的方式。
### 缺点：

- **复杂性**：多层装饰可能导致系统复杂性增加。

类图：
![Pasted image 20251222202638.png](https://s3.bmp.ovh/2026/04/06/V21ddcrJ.png)

```java
// 装饰器模式:允许一个现有对象添加新的功能。大概就是用一个装饰类去将对象包装，动态修改行为
interface robots{
    // 原始基底
    public void dosomething();
}
class robotsDemo implements robots {
    @Override
    public void dosomething(){
        System.out.println("洗衣服");
        System.out.println("做饭");
    }

}
class decorateDecoratorDemo implements robots{
    // 进行修饰
    private robots robot;
    public decorateDecoratorDemo(robots robot){
        this.robot = robot;
    }

    @Override
    public void dosomething(){
        robot.dosomething(); // 用新代定义的函数用回初代的功能
    }

    public void domorething(){
        System.out.println("唱跳Rap");
    }
}

public class DecoratorDemo{
    public static void main(String[] args){
        // 第一代
        System.out.println("第一代锐克机器人");
        robotsDemo robotsDemo = new robotsDemo();
        robotsDemo.dosomething();

        System.out.println("第二代锐克机器人");
        decorateDecoratorDemo decoratorDemo = new decorateDecoratorDemo(new robotsDemo());
        decoratorDemo.dosomething();
        decoratorDemo.domorething();
    }
}
```