using BudgetManagment.DbModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;

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

    [HttpPut("{id}")]
    [HttpGet("{id}")]
    [Produces(MediaTypeNames.Application.Json)]
    public IActionResult GetExpenses(int id)
    {
        // Validate unique email
        if (!_dbContext.Expenses.Any(i => i.Id == id))
        {
            return Conflict("Wrong id");
        }

        return Ok(new { Income = _dbContext.Expenses.FirstOrDefault(i => i.Id == id)!.Value });
    }


    [HttpPut("{id}/{income}")]
    public IActionResult UpdateExpenses(int id, int income)
    {
        // Validate unique email
        if (!_dbContext.Expenses.Any(i => i.Id == id))
        {
            return Conflict("Wrong id");
        }

        _dbContext.Expenses.FirstOrDefault(i => i.Id == id)!.Value = income;
        _dbContext.SaveChanges();

        return Ok();
    }
}