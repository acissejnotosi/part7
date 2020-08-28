describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Jessica Isoton",
      username: "jenotosi",
      passwordHash: "s3nh4",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("blogs");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("jenotosi");
      cy.get("#password").type("s3nh4");
      cy.get("#login-button").click();
      cy.get("html").should("contain", "Jessica Isoton logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#logout").click();
      cy.get("#username").type("jenotosi");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "jenotosi", passwordHash: "s3nh4" });
    });

    it("A blog can be created", function () {
      cy.contains("Create").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#submit-blog").click();
      cy.contains("test title test author");
    });

    it("User can like a blog", function () {
      cy.createBlog({ title: "test", author: "test", url: "test", likes: "0" });
      cy.createBlog({
        title: "test 2",
        author: "test 2",
        url: "test 2",
        likes: "0",
      });
      cy.contains("test 2 test 2").contains("view").click();
      cy.contains("test 2 test 2").contains("like").click();
      cy.contains("test 2 test 2").contains("1");
      cy.contains("Blog test 2 was successfully updated!");
    });

    it("User can delete its own blog", function () {
      cy.createBlog({ title: "test", author: "test", url: "test", likes: "0" });
      cy.contains("test test").contains("view").click();
      cy.contains("test test").contains("delete").click();
      cy.contains("Blog test removed with success!");
    });

    it.only("The blogs are in decrescent order according to the number of likes", function () {
      cy.createBlog({ title: "test", author: "test", url: "test", likes: "3" });
      cy.createBlog({
        title: "test 2",
        author: "test 2",
        url: "test 2",
        likes: "7",
      });
      cy.contains("test test").contains("view").click();
      cy.contains("test 2 test 2").contains("view").click();
      cy.get("#like-label").then(($firstlike) => {
        console.log($firstlike);
        const firstLike = $firstlike[0].innerText;
        cy.get("#like-label").should(($seclike) => {
          console.log($seclike[0].innerText);
          expect($seclike[0].innerText).to.be.lessThan(firstLike);
        });
      });
    });
  });
});
