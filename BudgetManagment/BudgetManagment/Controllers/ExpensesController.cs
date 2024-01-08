using BudgetManagment.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagment.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExpensesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public ExpensesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    [HttpGet]
    public IActionResult GetExpenses(int id)
    {
        // Validate unique email
        if (!_dbContext.Expenses.Any(i => i.Id == id))
        {
            return Conflict("Wrong id");
        }

        return Ok(_dbContext.Expenses.FirstOrDefault(i => i.Id == id)!.Value);
    }


    [HttpPut("{id}/{expenses}")]
    public IActionResult UpdateExpenses(int id, int expenses)
    {
        // Validate unique email
        if (!_dbContext.Expenses.Any(i => i.Id == id))
        {
            return Conflict("Wrong id");
        }

        var currentValue = _dbContext.Expenses.FirstOrDefault(i => i.Id == id)!.Value + expenses;
        _dbContext.Expenses.FirstOrDefault(i => i.Id == id)!.Value = currentValue;
        _dbContext.SaveChanges();

        return Ok(currentValue);
    }
}